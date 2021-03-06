# MeanMachine

An open-source platform for citizens to report potential or current potential fire and obstruction hazards powered by IBM cloud Visual Recognition and Twitter.

## What are we trying to solve?

While text analysis of social media has been extensively studied, visual information or the posted images has not been utilized for good. These “images” referred to images posted on social media and in our case Twitter. We focused on the image analysis of Twitter images with the hashtags #scdftweetrescue when citizens want to raise an alert that they think is a potential hazard and calls for concern. Especially, posted photos showing fire hazards that include overloading of electrical outlets with too many plugs, obstruct fire exit, and escape passageways, wedging of the fire door open, the use of Electrical or M&E Riser compartments as storage areas and more.

#### Link to detailed proposal:

https://drive.google.com/file/d/1TnYb8YWEB54cTOYX41IWwHltIC0xNDSh/view?usp=sharing

## Link to pitch:

https://www.youtube.com/embed/oS3I6Ph7ywo

## What's the architecture?

In order to screen the social media photos in real-time, several independent modules were developed for the following sub-tasks: web scraping, image analysis, and classification by IBM Watson™ Visual Recognition on IBM cloud. 

Our Dashboard is built with a hybrid of react and flask framework and could be immediately deployable to a compatible server (local/cloud).

## What's going to happen next?

Potentially, this can be a supplementary tool for a Fire Safety Manager, obtaining a Fire Certificate (FC) or Temporary Fire Permit (TFP) / Fire Safety Certificate (FSC) that every owner or occupier of any building such as offices, hospitals, shopping complexes, industrial buildings, and private residential buildings have to apply and obtain. While harnessing the community to post potential fire hazards to make building owners continue to pay attention and resources to maintain fire safety standards and requirements in check even after obtaining certificates and doing inspections. 

## Powered by Cloud?

Indeed we have harness the ability of IBM Watson™ Visual Recognition on IBM cloud that uses deep learning algorithms to analyze images for scenes, objects, faces, and other content.

#### Link to learn more about Watson Visual Recognition:

https://www.ibm.com/sg-en/cloud/watson-visual-recognition

## Contributors

Thanks to the following wizards who have contributed to this project:

* [@Jasperabez](https://github.com/Jasperabez) 📖
* [@hanscau](https://github.com/hanscau) 🐛
* [@weijuinlee](https://github.com/weijuinlee) 🐛

We are a team of three passionate programeers namely Jabez Tho, Hans Delano, Lee Wei Juin from Singapore Polytechnic who want to apply software engineering for good! We believe in programming good practices where it is first, understand; second, do. Follow them and you will literally and figuratively be on your way to the top!

# Local Deployment

- Clone this repo!!

`git clone https://github.com/Jasperabez/MeanMachine_TweetRescue_SCDFXIBM`

## Build react app
- Go to ui directory
- install npm dependencies
`npm install`
- build project
`npm run build`

## Configuring IBM Watson Visual Recognition
- train a image model on IBM Watson Visual Recognition
- create a new file app/secret.py with the following lines
```python
WATSON_API_KEY = '<your api key>'
WATSON_URL_ENDPOINT = '<your endpoint>'
```
- change the collection id in app/ibm_visual.py
```python
results = visual_recognition.analyze(
            collection_ids=["<your collection id>"],
            features=['objects'],
            image_url=image_url
            ).get_result()
```
- add the newly trained features into allowed features (allowed to show on dashboard)

app/app.py 

`Line 32`
```python
acceptableFeatures = {'Hose':0.6}
```
replace or append with
```python
acceptableFeatures = {'Hose':0.6, 
'<new feature>':<min confident socre>}
```


## Flask server
- install dependencies (recommnended using virtualenv)

`pip install -r .app/requirements.txt`
- run python script

`python .app/app.py`

## Your webapp is live start tweeting!!

### tweet have to follow the following standard:
- include the hashtag #scdftweetrescue
- include location in the following format

`Location: <Your Address!>`
- attach a picture of the scene

Example:

![image](example.png)
**IMPORTANT: tweet wouldn't be display if format not followed or address is invalid**


# Global deployment (to the internet!!)
## do some steps before following local development guide

- replace "localhost:5000" in ui/src/App.js and package.json with your public ip and port
- change the following line in app/app.py

from 

`    socketio.run(app, debug=True, host='localhost')`

to

`    socketio.run(app, debug=True, host='0.0.0.0')`