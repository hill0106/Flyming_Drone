const API_KEY = "AIzaSyBdxx-qUvI6-uiXcIwwArl6_VkL2Y8TW20";
const CHANNEL_ID = 'CHANNEL_ID';

// fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&key=${API_KEY}`)
//   .then(response => response.json())
//   .then(data => {
//     // Process the fetched data
//     console.log(data);
//   })
//   .catch(error => console.error('Error fetching data:', error));


function getYoutubeDataByType(tab_id) {
    const img_link_list = ['https://plus.unsplash.com/premium_photo-1670333183141-9e3ffc533dfa?q=80&w=2612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1713365963723-655fa464b681?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1684091808620-5f214652f649?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1714584981219-850bec3bb612?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1669201825198-bedf4966563e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80'];
    const videoData = {
        img_link: img_link_list[tab_id],
        video_title: "Sample Video Title",
        video_time: "2023-05-10",
        video_des: "This is a sample video description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        video_link:"https://example.com/video.mp4"
    }

    return videoData
}

exports.getYoutubeDataByType = getYoutubeDataByType;
