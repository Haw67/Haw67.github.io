using UnityEngine;
using System.Collections.Generic;

public class DataHandler : MonoBehaviour
{
    public GameObject furniture;

    private static DataHandler instance;
    public static DataHandler Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindAnyObjectByType<DataHandler>();
            }
            return instance;
        }
    }

    // Track spawned furniture
    private HashSet<string> spawnedFurniture = new HashSet<string>();

    public bool HasFurnitureBeenSpawned(string furnitureName)
    {
        return spawnedFurniture.Contains(furnitureName);
    }

    public void MarkFurnitureAsSpawned(string furnitureName)
    {
        spawnedFurniture.Add(furnitureName);
    }
}
