using UnityEngine;
using UnityEngine.UI;
using UnityEngine.XR.ARFoundation;
using System.Collections.Generic;

public class InputManager : MonoBehaviour
{
    [SerializeField] private ARRaycastManager _raycastManager;
    [SerializeField] private Camera arCam;
    [SerializeField] private Button deleteButton; // UI Delete Button

    private List<ARRaycastHit> _hits = new List<ARRaycastHit>();
    public GameObject selectedFurniture = null;
    private bool isRotating = false;
    private bool isResizing = false;
    private Vector2 initialTouchPosition;
    private float holdTimer = 0f;
    private const float holdDuration = 2f;
    private float rotationSpeed = 0.3f;
    private float initialPinchDistance;
    private Vector3 initialScale;

    void Start()
    {
        // Ensure Delete Button is Hidden Initially
        if (deleteButton != null)
        {
            deleteButton.gameObject.SetActive(false);
            deleteButton.onClick.AddListener(DeleteSelectedFurniture); // Attach Delete Function
        }
    }

    void Update()
    {
        if (Input.touchCount == 1)
        {
            Vector2 touchPosition = Input.GetTouch(0).position;

            if (Input.GetTouch(0).phase == TouchPhase.Began)
            {
                holdTimer = 0f;

                // Check if user tapped on existing furniture
                Ray ray = arCam.ScreenPointToRay(touchPosition);
                if (Physics.Raycast(ray, out RaycastHit hit))
                {
                    if (hit.collider.CompareTag("Selectable"))
                    {
                        selectedFurniture = hit.collider.gameObject;
                        deleteButton.gameObject.SetActive(true); // Show Delete Button
                        Debug.Log("Furniture selected: " + selectedFurniture.name);
                    }
                }
            }

            if (Input.GetTouch(0).phase == TouchPhase.Stationary || Input.GetTouch(0).phase == TouchPhase.Moved)
            {
                holdTimer += Time.deltaTime;
                if (holdTimer >= holdDuration && !isRotating)
                {
                    isRotating = true;
                    initialTouchPosition = touchPosition;
                    Debug.Log("Started rotating furniture");
                }
            }

            // 360-degree Rotation
            if (isRotating && Input.GetTouch(0).phase == TouchPhase.Moved)
            {
                Vector2 delta = touchPosition - initialTouchPosition;
                selectedFurniture.transform.Rotate(Vector3.up, delta.x * rotationSpeed, Space.World);
                //selectedFurniture.transform.Rotate(Vector3.right, -delta.y * rotationSpeed, Space.World); // Allow full X-axis rotation
                initialTouchPosition = touchPosition;
                Debug.Log("Rotating furniture: " + selectedFurniture.name);
            }

            if (Input.GetTouch(0).phase == TouchPhase.Ended)
            {
                if (isRotating)
                {
                    Debug.Log("Finished rotating furniture");
                    isRotating = false;
                }
                holdTimer = 0f;
            }

            // Prevent spawning duplicates
            if (selectedFurniture == null && DataHandler.Instance.furniture != null)
            {
                if (_raycastManager.Raycast(touchPosition, _hits, UnityEngine.XR.ARSubsystems.TrackableType.Planes))
                {
                    Pose hitPose = _hits[0].pose;
                    string furnitureName = DataHandler.Instance.furniture.name;
                    if (GameObject.Find(furnitureName) != null)
                    {
                        Debug.LogWarning("This furniture has already been spawned: " + furnitureName);
                        return;
                    }

                    GameObject spawnedFurniture = Instantiate(DataHandler.Instance.furniture, hitPose.position, hitPose.rotation);
                    spawnedFurniture.name = furnitureName;
                    spawnedFurniture.tag = "Selectable";
                    Debug.Log("Furniture spawned: " + furnitureName);
                }
            }

            // Move furniture
            if (!isRotating && selectedFurniture != null && Input.GetTouch(0).phase == TouchPhase.Moved)
            {
                if (_raycastManager.Raycast(touchPosition, _hits, UnityEngine.XR.ARSubsystems.TrackableType.Planes))
                {
                    Pose hitPose = _hits[0].pose;
                    selectedFurniture.transform.position = hitPose.position;
                    Debug.Log("Moving furniture to: " + hitPose.position);
                }
            }
        }

        // Resize furniture using pinch gesture
        if (Input.touchCount == 2 && selectedFurniture != null)
        {
            Touch touch1 = Input.GetTouch(0);
            Touch touch2 = Input.GetTouch(1);

            float currentPinchDistance = Vector2.Distance(touch1.position, touch2.position);

            if (touch1.phase == TouchPhase.Began || touch2.phase == TouchPhase.Began)
            {
                isResizing = true;
                initialPinchDistance = currentPinchDistance;
                initialScale = selectedFurniture.transform.localScale;
            }

            if (isResizing && (touch1.phase == TouchPhase.Moved || touch2.phase == TouchPhase.Moved))
            {
                float scaleFactor = currentPinchDistance / initialPinchDistance;
                Vector3 newScale = initialScale * scaleFactor;

                Vector3 minScale = initialScale * 0.3f;
                Vector3 maxScale = initialScale * 3f;

                selectedFurniture.transform.localScale = new Vector3(
                    Mathf.Clamp(newScale.x, minScale.x, maxScale.x),
                    Mathf.Clamp(newScale.y, minScale.y, maxScale.y),
                    Mathf.Clamp(newScale.z, minScale.z, maxScale.z)
                );

                Debug.Log("Resizing furniture: " + selectedFurniture.name + " Scale: " + selectedFurniture.transform.localScale);
            }

            if (touch1.phase == TouchPhase.Ended || touch2.phase == TouchPhase.Ended)
            {
                isResizing = false;
                Debug.Log("Finished resizing furniture");
            }
        }

        // Deselect furniture when releasing touch
        if (Input.touchCount == 0 && selectedFurniture != null && !isRotating && !isResizing)
        {
            Debug.Log("Furniture deselected: " + selectedFurniture.name);
            selectedFurniture = null;
            deleteButton.gameObject.SetActive(false); // Hide Delete Button
        }
    }

    // **Delete Function**
    public void DeleteSelectedFurniture()
    {
        if (selectedFurniture != null)
        {
            string deletedFurnitureName = selectedFurniture.name;
            Destroy(selectedFurniture);
            selectedFurniture = null;
            deleteButton.gameObject.SetActive(false); // Hide Delete Button
            Debug.Log("Furniture deleted: " + deletedFurnitureName);
        }
    }
}
