using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;
using System.Collections;

public class ButtonManager : MonoBehaviour
{
    private Button btn;
    public GameObject furniture;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        btn = GetComponent<Button>();
        btn.onClick.AddListener(SelectObject);
    }

    // Update is called once per frame
    void Update()
    {
       
    }

    public void SelectObject()
    {
        DataHandler.Instance.furniture = furniture;

        Debug.Log("Selected furniture: " + DataHandler.Instance.furniture.name);
    }
}
