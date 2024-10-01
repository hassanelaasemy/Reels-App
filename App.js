import React, { useState, useRef } from "react";
import { StyleSheet, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoItem from "./VideoItem";
const videoData = [
  {
    id: "1",
    uri: "https://rr3---sn-apn7en7e.googlevideo.com/videoplayback?expire=1727801689&ei=-dT7ZvmLC7fX6dsPi7OvuAI&ip=5.59.255.5&id=o-ANVjZ_GKKPvw1iwB1Z3i1fQiBEuObsjNSGTt6ivx8mTM&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AXLXGFR5xDP1YqwYDxPpyojjRMlhPgxmvvCIt9BfpVkj0aSBtfMcontF7JdctT4xLH4HcBBDQVA8tE19&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=1405620&ratebypass=yes&dur=18.944&lmt=1726261774438507&fexp=51299152&c=ANDROID_CREATOR&txp=5530434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhALxZm3v-iYcClOIzYpDliqUhjelrDbdISvWUQIlcVvuZAiEAu9csN91WCeBxwGB-nsjrFTKCxHBC__Z8qwRb-M5Dyqc%3D&title=@VancityReynolds%20I%20painted%20you%20using%20a%20sword!%20%E2%9A%94%EF%B8%8F%20&rm=sn-gxuo03g-ig3l7l,sn-5hnesl7z&rrc=79,104&req_id=35d555da408ba3ee&met=1727780095,&rms=rdu,rdu&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=Zg&mip=160.176.3.113&mm=29&mn=sn-apn7en7e&ms=rdu&mt=1727779790&mv=m&mvi=3&pl=21&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ABPmVW0wRgIhANFMfc51iTBWmXBuy2_cDNEYTdZzRIcOC0bDOezr8w3mAiEAjy-tzKwsIV0EwyHfk9WKKVxHTQgpHdwLsCUkZPSlxGg%3D#deadpool%20#paintings%20#art%20#ryanreynolds",
    likes: "1.2M",
    comments: "5.4K",
    username: "ArtistExtraordinaire",
    userAvatar:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1800&t=st=1727780974~exp=1727781574~hmac=ba418628bbdd1cc7bd02b00da6a84f86594a460cc4e6ee3b946d440e3e057e47",
    title: "Painting Deadpool with a sword! #art #ryanreynolds",
  },
  {
    id: "2",
    uri: "https://rr2---sn-p5h-jhoe7.googlevideo.com/videoplayback?expire=1727801873&ei=sdX7ZuyBDd74sfIPh_GgoAc&ip=69.30.77.115&id=o-AHQU-gXl_HLIaQ-b_faXN4N4p5q2RP6g3zTqWXJsdnZf&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AXLXGFSdWVaoPaliIldooktzkWHkcZ-Ny403Nyrmq7oVfJukNj9e9yf4fSMSmNU6Xu0wjo8f-oZpe19J&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=1351367&ratebypass=yes&dur=17.365&lmt=1721011836210808&fexp=51299152&c=ANDROID_CREATOR&txp=5530434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgcUsimsFDRFUwHeIPZJ8fvGSb597MFZOwu5Rxr4pQ9IkCIAwQSDaPgQtQEvTQXgT2zJaqxi9Ih1yfAub1JPqeTQN8&title=Getting%20kids%20hooked%20on%20motorcycles%20%F0%9F%91%8F&redirect_counter=1&rm=sn-a5meey7s&rrc=104&req_id=3c7e56842b57a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1727780276,&mh=1W&mip=160.176.3.113&mm=31&mn=sn-p5h-jhoe7&ms=au&mt=1727780014&mv=m&mvi=2&pl=21&rms=au,au&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ABPmVW0wRAIgSRUq1E3chXdydwXcZGIo4xLRHRYCJbqMfSWr4WUzZtkCIDU3s0mxOvOZXDAlAs8GutzTRZsvEF_Zr0zabQvA9wET",
    likes: "456K",
    comments: "2.1K",
    username: "MotoKidz",
    userAvatar:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1800&t=st=1727780974~exp=1727781574~hmac=ba418628bbdd1cc7bd02b00da6a84f86594a460cc4e6ee3b946d440e3e057e47",
    title: "Getting kids hooked on motorcycles 👏",
  },
  {
    id: "3",
    uri: "https://rr4---sn-p5h-jhoy.googlevideo.com/videoplayback?expire=1727802083&ei=g9b7Zv6fCfupsfIP7M3KyAQ&ip=69.30.77.231&id=o-AALKhQGs_CIjJmujPaBwDtaGg8cQyo-i_nlvU18dU2L0&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AXLXGFRb2oE2H7ASoy2Z-FJFP6JaqBK2yvIPGj7Wu6JX3rHP34cedTApn1DvEMZVijjJzMTnus7d2Yu1&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=1110716&ratebypass=yes&dur=15.018&lmt=1722243063292375&fexp=51299152&c=ANDROID_CREATOR&txp=5530434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgHIQLIjsBuW3OvSZEawOxKDgD0hqanFvFswVU0Z0HCFkCIQD7WYQfvz_ssizhrVBraaTiCZeJlVysfbqHpkrDa-WwqA%3D%3D&title=FALLING%2017%20METERS%20%F0%9F%A4%AF&redirect_counter=1&rm=sn-a5me767s&rrc=104&req_id=e3b4b6c6b9faa3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1727780488,&mh=1e&mip=160.176.3.113&mm=31&mn=sn-p5h-jhoy&ms=au&mt=1727780270&mv=m&mvi=4&pl=21&rms=au,au&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ABPmVW0wRgIhALgik_yYvRJVIKtRnYAZU7c0o6aNAGTgPQErxbc1buTwAiEAuarBL2QGTRGqZTwRIJig9_aEkbLmQlMguGEYOlC9r2c%3D",
    likes: "789K",
    comments: "3.7K",
    username: "ExtremeAdventures",
    userAvatar:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1800&t=st=1727780974~exp=1727781574~hmac=ba418628bbdd1cc7bd02b00da6a84f86594a460cc4e6ee3b946d440e3e057e47",
    title: "FALLING 17 METERS 🤯",
  },
];

export default function App() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const flatListRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const renderItem = ({ item, index }) => (
    <VideoItem
      item={item}
      isActive={index === activeVideoIndex}
      isMuted={isMuted}
      toggleMute={toggleMute}
    />
  );

  const onViewableItemsChanged = useRef(({ changed }) => {
    const newActiveIndex = changed[0]?.index;
    if (newActiveIndex !== undefined) {
      setActiveVideoIndex(newActiveIndex);
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        ref={flatListRef}
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
