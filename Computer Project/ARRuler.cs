using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using TMPro;
using UnityEngine.UI; // For UI components
using DIG.UIExpansion;  // Import SlideToggle namespace

public class ARRuler : MonoBehaviour
{
    public ARRaycastManager raycastManager;  // AR Raycast system
    public GameObject pointPrefab; // Prefab for measurement points
    public TextMeshProUGUI distanceText; // UI Text for displaying the measured distance
    public LineRenderer lineRenderer; // Reference to the Line Renderer
    public ToggleSlide slideToggle;  // SlideToggle from UI Extensions

    public Image toggleBackground;  // Background image of SlideToggle
    public Color onColor = Color.green;  // Background color when ON
    public Color offColor = Color.white;  // Background color when OFF

    private List<GameObject> placedPoints = new List<GameObject>(); // Stores placed points
    private bool isMeasurementActive = false; // Track if measurement is enabled

    void Start()
    {
        distanceText.gameObject.SetActive(false); // Hide text initially
        slideToggle.OnValueChange.AddListener(OnSlideToggleChanged); // Listen to slide toggle changes
        UpdateToggleColor(slideToggle.IsActive); // Set initial color
    }

    void Update()
    {
        if (!isMeasurementActive) return; // Disable measurement if toggle is OFF

        if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)
        {
            PlacePoint();
        }
    }

    void OnSlideToggleChanged(bool isOn)
    {
        isMeasurementActive = isOn;
        UpdateToggleColor(isOn);

        if (!isMeasurementActive)
        {
            ClearMeasurement(); // Clear everything when SlideToggle is turned OFF
        }
    }

    void UpdateToggleColor(bool isOn)
    {
        if (toggleBackground != null)
        {
            toggleBackground.color = isOn ? onColor : offColor;
        }
    }

    void PlacePoint()
    {
        // Perform a raycast from the touch position
        List<ARRaycastHit> hits = new List<ARRaycastHit>();
        if (raycastManager.Raycast(Input.GetTouch(0).position, hits, TrackableType.PlaneWithinPolygon))
        {
            // Get the first hit position
            Pose hitPose = hits[0].pose;

            // Instantiate a new point at the hit position
            GameObject newPoint = Instantiate(pointPrefab, hitPose.position, Quaternion.identity);
            placedPoints.Add(newPoint);

            // If two points are placed, calculate the distance and draw a line
            if (placedPoints.Count == 2)
            {
                float distance = Vector3.Distance(placedPoints[0].transform.position, placedPoints[1].transform.position);

                // Show distance text
                distanceText.text = "Distance: " + (distance * 100).ToString("F2") + " cm";
                distanceText.gameObject.SetActive(true);

                // Draw the line
                lineRenderer.positionCount = 2;
                lineRenderer.SetPosition(0, placedPoints[0].transform.position);
                lineRenderer.SetPosition(1, placedPoints[1].transform.position);

                // Start coroutine to clear points, line, and text
                StartCoroutine(ClearAfterSeconds(2f));
            }
        }
    }

    IEnumerator ClearAfterSeconds(float seconds)
    {
        yield return new WaitForSeconds(seconds);
        ClearMeasurement();
    }

    void ClearMeasurement()
    {
        // Remove placed points
        foreach (GameObject point in placedPoints)
        {
            Destroy(point);
        }
        placedPoints.Clear();

        // Clear the line
        lineRenderer.positionCount = 0;

        // Hide distance text
        distanceText.gameObject.SetActive(false);
    }
}
