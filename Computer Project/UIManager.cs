using UnityEngine;
using UnityEngine.UI;

public class UIManager : MonoBehaviour
{
    [SerializeField] private ScrollRect scrollRect; // Reference to the ScrollRect
    [SerializeField] private RectTransform content; // The content inside the ScrollRect
    [SerializeField] private float enlargedScale = 1.2f; // Scale factor when the button is selected
    [SerializeField] private float defaultScale = 1.0f; // Default scale of buttons
    [SerializeField] private float scaleSpeed = 5f; // Speed of scaling animation

    private Button[] buttons; // Array to store all buttons in the scrollable area
    private Button selectedButton = null; // The currently selected button

    void Start()
    {
        // Get all Button components in the ScrollRect's content
        buttons = content.GetComponentsInChildren<Button>();

        // Add listener to all buttons to detect clicks
        foreach (Button button in buttons)
        {
            button.onClick.AddListener(() => OnButtonClick(button));
        }
    }

    void Update()
    {
        // Smoothly scale buttons
        foreach (Button button in buttons)
        {
            if (button == selectedButton)
            {
                // Scale up the selected button
                button.transform.localScale = Vector3.Lerp(button.transform.localScale, Vector3.one * enlargedScale, Time.deltaTime * scaleSpeed);
            }
            else
            {
                // Scale down unselected buttons
                button.transform.localScale = Vector3.Lerp(button.transform.localScale, Vector3.one * defaultScale, Time.deltaTime * scaleSpeed);
            }
        }
    }

    void OnButtonClick(Button button)
    {
        // Set the clicked button as selected
        selectedButton = button;
        Debug.Log("Selected button: " + button.name);
    }
}