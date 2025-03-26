using UnityEngine;
using UnityEngine.UI;
using UnityEngine.XR.ARFoundation;

public class ScrollViewManager : MonoBehaviour
{
    [SerializeField] private GameObject scrollView; // Assign ScrollView in the Inspector
    [SerializeField] private ARPlaneManager arPlaneManager; // Assign AR Plane Manager
    [SerializeField] private GameObject slideToggle; // Assign SlideToggle UI element
    [SerializeField] private GameObject screenshotButton; // Assign Screenshot Button UI
    [SerializeField] private GameObject screenshotText; // Assign Screenshot Button UI
    [SerializeField] private GameObject ColorPickerPanel;
    [SerializeField] private GameObject ColorPickerSliderToggle;
    [SerializeField] private GameObject DeleteAll;

    private bool isVisible = true; // Default: UI is visible

    void Start()
    {
        // **Hide the screenshot button when the app starts**
        if (screenshotButton != null)
        {
            screenshotButton.SetActive(false);
        }
    }

    public void ToggleVisibility()
    {
        isVisible = !isVisible;

        // Toggle Scroll View
        if (scrollView != null)
        {
            scrollView.SetActive(isVisible);
        }

        // Toggle AR Planes
        foreach (var plane in arPlaneManager.trackables)
        {
            plane.gameObject.SetActive(isVisible);
        }

        // Toggle SlideToggle
        if (slideToggle != null)
        {
            slideToggle.SetActive(isVisible);
        }

        // **Make Screenshot Button behave oppositely**
        if (screenshotButton != null)
        {
            screenshotButton.SetActive(!isVisible); // Inverted
        }

        if (screenshotText != null)
        {
            screenshotText.SetActive(!isVisible); // Inverted
        }

        if (ColorPickerPanel != null)
        {
            ColorPickerPanel.SetActive(isVisible);
        }

        if (ColorPickerSliderToggle != null)
        {
            ColorPickerSliderToggle.SetActive(isVisible);
        }

        if (DeleteAll != null)
        {
            DeleteAll.SetActive(isVisible);
        }
    }
}
