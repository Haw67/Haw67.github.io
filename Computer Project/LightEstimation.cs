using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class LightEstimation : MonoBehaviour
{
    public ARCameraManager arCameraManager;
    public Light directionalLight;

    void OnEnable()
    {
        arCameraManager.frameReceived += OnFrameUpdate;
    }

    void OnDisable()
    {
        arCameraManager.frameReceived -= OnFrameUpdate;
    }

    void OnFrameUpdate(ARCameraFrameEventArgs args)
    {
        if (args.lightEstimation.averageBrightness.HasValue)
            directionalLight.intensity = args.lightEstimation.averageBrightness.Value;

        if (args.lightEstimation.colorCorrection.HasValue)
            directionalLight.color = args.lightEstimation.colorCorrection.Value;
    }
}
