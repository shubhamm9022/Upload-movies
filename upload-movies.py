import requests
import threading

# API Keys (replace with your actual keys)
earnvids_api_key = "38889zs41a2iy4jrldqg3"
streamtape_api_key = "dq6hzjewe27bmwdn"
pixeldrain_api_key = "e9d21dfd-f456-4d61-aa2c-435d8b8ff516"

# File path for the movie you want to upload
file_path = 'path_to_your_movie_file.mp4'

# Function to upload to Earnvids
def upload_to_earnvids():
    url = "https://api.earnvids.com/upload"
    headers = {"Authorization": f"Bearer {earnvids_api_key}"}
    with open(file_path, 'rb') as f:
        response = requests.post(url, files={'file': f}, headers=headers)
    if response.status_code == 200:
        print("Movie uploaded successfully to Earnvids!")
    else:
        print("Error uploading to Earnvids:", response.text)

# Function to upload to Streamtape
def upload_to_streamtape():
    url = "https://api.streamtape.com/upload"
    headers = {"Authorization": f"Bearer {streamtape_api_key}"}
    with open(file_path, 'rb') as f:
        response = requests.post(url, files={'file': f}, headers=headers)
    if response.status_code == 200:
        print("Movie uploaded successfully to Streamtape!")
    else:
        print("Error uploading to Streamtape:", response.text)

# Function to upload to Pixeldrain
def upload_to_pixeldrain():
    url = "https://pixeldrain.com/api/file/upload"
    headers = {"Authorization": f"Bearer {pixeldrain_api_key}"}
    with open(file_path, 'rb') as f:
        response = requests.post(url, files={'file': f}, headers=headers)
    if response.status_code == 200:
        print("Movie uploaded successfully to Pixeldrain!")
    else:
        print("Error uploading to Pixeldrain:", response.text)

# Run all uploads simultaneously using threading
def upload_movie():
    threads = []
    threads.append(threading.Thread(target=upload_to_earnvids))
    threads.append(threading.Thread(target=upload_to_streamtape))
    threads.append(threading.Thread(target=upload_to_pixeldrain))

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()

upload_movie()
