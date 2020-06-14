from ibm_watson import VisualRecognitionV4
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from secret import WATSON_API_KEY, WATSON_URL_ENDPOINT
import json
import re

authenticator = IAMAuthenticator(WATSON_API_KEY)
visual_recognition = VisualRecognitionV4(
    version='2020-02-11',
    authenticator=authenticator
)

visual_recognition.set_service_url(WATSON_URL_ENDPOINT)

def getObjects(image_url):
    objectList = []
    if not len(image_url)>0:
        objectList.append([])
    else:
        try:
            results = visual_recognition.analyze(
                        collection_ids=["84a6e288-ea3e-4318-b9a0-bce7843e151c"],
                        features=['objects'],
                        image_url=image_url
                        ).get_result()
            for result in results['images']:
                objectList.append(result["objects"]["collections"][0]["objects"])
        except:
            objectList.append([])
    return(objectList[0])  

print(getObjects(['https://pbs.twimg.com/media/EacywYJUMAEKNDg.jpg']))