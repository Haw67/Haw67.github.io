using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

public class DeleteAllFurniture : MonoBehaviour
{
    public GameObject confirmationPanel; // Assign the UI confirmation panel
    public List<GameObject> placedFurniture = new List<GameObject>(); // List of placed furniture

    void Start()
    {
        confirmationPanel.SetActive(false); // Hide the confirmation panel at the start
    }

    // Show the confirmation panel when Delete All is clicked
    public void ShowConfirmation()
    {
        confirmationPanel.SetActive(true);
    }

    // Hide the confirmation panel when "No" is clicked
    public void CancelDelete()
    {
        confirmationPanel.SetActive(false);
    }

    // Delete all furniture when "Yes" is clicked
    public void ConfirmDelete()
    {
        foreach (GameObject furniture in placedFurniture)
        {
            Destroy(furniture);
        }
        placedFurniture.Clear();
        confirmationPanel.SetActive(false); // Hide confirmation after deletion
    }
}
