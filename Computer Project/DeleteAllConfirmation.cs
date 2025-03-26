using UnityEngine;
using UnityEngine.UI;

public class DeleteAllConfirmation : MonoBehaviour
{
    public InputManager inputManager;
    public GameObject confirmationPopup;
    public Button confirmButton;
    public Button cancelButton;

    void Start()
    {
        confirmationPopup.SetActive(false); // Hide popup at start

        confirmButton.onClick.AddListener(DeleteAllFurniture);
        cancelButton.onClick.AddListener(ClosePopup);
    }

    public void ShowPopup()
    {
        confirmationPopup.SetActive(true);
    }

    void ClosePopup()
    {
        confirmationPopup.SetActive(false);
    }

    public void DeleteAllFurniture()
    {
        if (inputManager != null)
        {
            foreach (GameObject furniture in GameObject.FindGameObjectsWithTag("Selectable"))
            {
                Destroy(furniture);
            }
            inputManager.selectedFurniture = null; // Deselect furniture
            confirmationPopup.SetActive(false);
            Debug.Log("All furniture deleted!");
        }
    }
}
