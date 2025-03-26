using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.IO;
using System.Collections;

public class ScreenshotHandler : MonoBehaviour
{
    public Button screenshotButton; // Assign in Inspector
    public TextMeshProUGUI screenshotMessage; // Assign ScreenshotMessage UI Text in Inspector

    private void Start()
    {
        if (screenshotButton != null)
            screenshotButton.onClick.AddListener(TakeScreenshot);

        // Ensure the message is hidden at start
        screenshotMessage.color = new Color(1, 1, 1, 0);
    }

    void TakeScreenshot()
    {
        StartCoroutine(CaptureScreenshot());
    }

    private IEnumerator CaptureScreenshot()
    {
        yield return new WaitForEndOfFrame();

        // Generate file name
        string fileName = "AR_Screenshot_" + System.DateTime.Now.ToString("yyyyMMdd_HHmmss") + ".png";
        string filePath = Path.Combine(Application.persistentDataPath, fileName);

        // Capture screen
        Texture2D screenTexture = new Texture2D(Screen.width, Screen.height, TextureFormat.RGB24, false);
        screenTexture.ReadPixels(new Rect(0, 0, Screen.width, Screen.height), 0, 0);
        screenTexture.Apply();

        // Save image
        byte[] imageBytes = screenTexture.EncodeToPNG();
        File.WriteAllBytes(filePath, imageBytes);
        Debug.Log("Screenshot saved: " + filePath);

        // Save to gallery (For Android/iOS)
#if UNITY_ANDROID || UNITY_IOS
        NativeGallery.SaveImageToGallery(filePath, "AR Screenshots", fileName);
        Debug.Log("Screenshot saved to Gallery!");
#endif

        Destroy(screenTexture);

        // Show Screenshot Message
        StartCoroutine(ShowScreenshotMessage());
    }

    private IEnumerator ShowScreenshotMessage()
    {
        // Set alpha to 1 (fully visible)
        screenshotMessage.color = new Color(1, 1, 1, 1);

        yield return new WaitForSeconds(2f); // Show for 1 second

        // Fade out
        for (float t = 1f; t > 0; t -= Time.deltaTime * 2)
        {
            screenshotMessage.color = new Color(1, 1, 1, t);
            yield return null;
        }

        // Ensure it's fully invisible
        screenshotMessage.color = new Color(1, 1, 1, 0);
    }
}
