import requests
from fake_useragent import UserAgent
from bs4 import BeautifulSoup

lat_long_class = 'BNeawe iBp4i AP7Wnd'
alternative_link_class = 'MUxGbd v0nnCb lyLwlc'
alternative_lat_long_class = 'BNeawe iBp4i AP7Wnd'
ua = UserAgent()

def get_coordinates(address, url=None):
    if url == None:
        google_url = "https://www.google.com.sg/search?q=" + str(address) + " lat and long"
    else:
        google_url= "https://www.google.com.sg" + url
    response = requests.get(google_url, {"User-Agent": ua.random})
    soup = BeautifulSoup(response.text, "html.parser")
    try:
        if url == None:
            lat_long_str = soup.find('div', attrs = {'class': lat_long_class}).get_text()
        else:
            lat_long_str = soup.find('div', attrs = {'class': lat_long_class}).find('div', attrs = {'class': lat_long_class}).get_text()
        lat_end = lat_long_str.find("° N, ")
        long_end = lat_long_str.find("° E")
        lati = lat_long_str[:lat_end]
        longti = lat_long_str[lat_end+5:long_end]
    except:
        try:
            link = soup.find('div', attrs = {'class': alternative_link_class}).find('a', href = True)
            if link != '':
                lati,longti = get_coordinates(None,link['href'])
        except:
            lati,longti = 256,256
    return (float(lati), float(longti))

# links = []
# titles = []
# descriptions = []
# for r in result_div:
#     # Checks if each element is present, else, raise exception
#     try:
#         link = r.find('a', href = True)
#         title = r.find('div', attrs={'class':'vvjwJb'}).get_text()
#         description = r.find('div', attrs={'class':'s3v9rd'}).get_text()
        
#         # Check to make sure everything is present before appending
#         if link != '' and title != '' and description != '': 
#             links.append(link['href'])
#             titles.append(title)
#             descriptions.append(description)
#     # Next loop if one element is not present
#     except:
#         continue
