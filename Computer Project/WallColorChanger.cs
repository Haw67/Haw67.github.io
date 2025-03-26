using UnityEngine;
using UnityEngine.UI;
using UnityEngine.XR.ARFoundation;
using System.Collections.Generic;
using TMPro;
using DIG.UIExpansion; // Import SlideToggle namespace

public class WallColorChanger : MonoBehaviour
{
    public ARPlaneManager arPlaneManager; // AR Plane Manager Reference

    // UI Elements
    public Slider redSlider, greenSlider, blueSlider;
    public TMP_Text redValueText, greenValueText, blueValueText; // Change Text to TMP_Text
    public Image colorPreview; // Preview Box
    public Button applyColorButton;
    public GameObject colorPickerPanel; // The UI Panel to Show/Hide
    public ToggleSlide slideToggle; // SlideToggle from UI Extensions
    public Image toggleBackground;  // Background image of SlideToggle
    public Color onColor = Color.green;  // Background color when ON
    public Color offColor = Color.white;  // Background color when OFF

    private List<ARPlane> detectedPlanes = new List<ARPlane>(); // Store detected planes

    void Start()
    {
        // Attach event listeners
        applyColorButton.onClick.AddListener(ApplyColor);
        slideToggle.OnValueChange.AddListener(OnSlideToggleChanged); // Listen to slide toggle changes

        // Add real-time preview listener
        redSlider.onValueChanged.AddListener(delegate { UpdatePreviewColor(); });
        greenSlider.onValueChanged.AddListener(delegate { UpdatePreviewColor(); });
        blueSlider.onValueChanged.AddListener(delegate { UpdatePreviewColor(); });

        if (arPlaneManager != null)
        {
            arPlaneManager.planesChanged += OnPlanesChanged; // Detect planes
        }

        UpdatePreviewColor(); // Initialize Preview Color
        UpdateToggleColor(slideToggle.IsActive); // Set initial toggle color
        colorPickerPanel.SetActive(slideToggle.IsActive); // Show/Hide panel based on toggle state
    }

    void OnDestroy()
    {
        if (arPlaneManager != null)
        {
            arPlaneManager.planesChanged -= OnPlanesChanged; // Unsubscribe
        }
    }

    void OnPlanesChanged(ARPlanesChangedEventArgs args)
    {
        foreach (ARPlane plane in args.added)
        {
            detectedPlanes.Add(plane);
        }
    }

    // Updates the Preview Box & RGB Texts
    void UpdatePreviewColor()
    {
        Color previewColor = new Color(redSlider.value, greenSlider.value, blueSlider.value, 1f);

        // Update UI elements
        colorPreview.color = previewColor;
        redValueText.text = $"R: {(int)(redSlider.value * 255)}";
        greenValueText.text = $"G: {(int)(greenSlider.value * 255)}";
        blueValueText.text = $"B: {(int)(blueSlider.value * 255)}";
    }

    // Apply Color to Walls
    void ApplyColor()
    {
        Color newColor = colorPreview.color;

        foreach (ARPlane plane in detectedPlanes)
        {
            MeshRenderer renderer = plane.GetComponentInChildren<MeshRenderer>();
            if (renderer != null)
            {
                renderer.material.color = newColor;
            }
        }

        Debug.Log("Wall color changed to: " + newColor);
    }

    // Handles SlideToggle changes
    void OnSlideToggleChanged(bool isOn)
    {
        colorPickerPanel.SetActive(isOn); // Show or hide color picker panel
        UpdateToggleColor(isOn); // Update toggle background color
    }

    // Change Toggle Background Color
    void UpdateToggleColor(bool isOn)
    {
        if (toggleBackground != null)
        {
            toggleBackground.color = isOn ? onColor : offColor;
        }
    }
}
