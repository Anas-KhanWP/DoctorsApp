import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from 'react-native-snap-carousel';
import Check from 'react-native-vector-icons/Feather';
import Back from 'react-native-vector-icons/Ionicons';
import Gender from 'react-native-vector-icons/Foundation';
import Mobile from 'react-native-vector-icons/Entypo';
import Error from 'react-native-vector-icons/MaterialIcons';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import Profession from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-paper';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const carouselItems = [
  {
    title: 'ONLY $9200 PER MONTH',
    detail: 'Subscription with queries in Guard and Specialist.',
    imageUri: 'https://link-to-image-1',
  },
  {
    title: 'EXCLUSIVE OFFER!',
    detail: 'Special discount for early subscribers.',
    imageUri: 'https://link-to-image-2',
  },
  {
    title: 'LIMITED TIME DEAL',
    detail: 'Get additional benefits with your subscription.',
    imageUri: 'https://link-to-image-3',
  },
];

const Dashboard = () => {
    const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.subscriptionBanner}>
      <Text style={styles.subscriptionText}>{item.title}</Text>
      <Text style={styles.subscriptionDetail}>{item.detail}</Text>
      <TouchableOpacity style={styles.moreInfoButton}>
        <Text style={styles.moreInfoText}>MORE INFORMATION</Text>
      </TouchableOpacity>
      <Image source={{ uri: item.imageUri }} style={styles.bannerImage} />
    </View>
  );
      const [userData, setUserData] = useState('');

    async function getData() {
      const token = await AsyncStorage.getItem('token');
      axios
        .post('http://192.168.1.7:5001/userdata', { token: token })
        .then(res => {
          setUserData(res.data.data);
        });
    }

    useEffect(() => {
      getData();
    }, []);


  return (
    <ScrollView style={styles.container}>
        <View>
                <View style={{position: 'relative'}}>
                  <TouchableOpacity
                    style={styles.backIcon}
                    onPress={() => {
                      navigation.dispatch(DrawerActions.openDrawer());
                    }}>
                    <Mobile name="menu" size={30} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editIcon}
                    onPress={() => {
                      navigation.navigate('UpdateProfile', {data: userData});
                    }}>
                    <Icon name="user-edit" size={24} color={'black'} />
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Avatar.Image
                    size={180}
                    style={styles.avatar}
                    source={{
                      uri:userData==""||userData==null?

                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
                    :userData.image
                    }}
                  />
                </View>
      <Carousel data={carouselItems} renderItem={renderItem} sliderWidth={screenWidth} itemWidth={screenWidth} autoplay loop />

      <View style={styles.menuContainer}>
        <MenuButton title="Online guard" icon="laptop"/>
        <MenuButton title="My subscriptions" icon="list-alt" isNew />
        <MenuButton title="Online specialists" icon="user-md" />
        <MenuButton title="Virtual pillbox" icon="pills" />
        <MenuButton title="Repository of studies" icon="folder" />
        <MenuButton title="Cardiovascular risk test" icon="heartbeat" isNew />
        <MenuButton title="Hypertension control" icon="tint" isNew />
        <MenuButton title="Dengue Monitoring" icon="bug" />
      </View>

      <TouchableOpacity style={styles.historyButton}>
        <Text style={styles.historyText}>My history</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const MenuButton = ({ title, icon, isNew }) => (
  <View style={styles.menuButton}>
    <Icon name={icon} size={20} color="#000" style={styles.icon} />
    <Text style={styles.menuText}>{title}</Text>
    {isNew && <Text style={styles.newTag}>new</Text>}
  </View>
);

const styles = StyleSheet.create({
    editIcon: {
        zIndex: 1,
        color: 'white',
        position: 'absolute',
        right: 2,
        margin: 15,
      },
      backIcon: {
        zIndex: 1,
        color: 'white',
        position: 'absolute',
        left: 2,
        margin: 15,
      },
      avatar: {
        borderRadius: 100,
        marginTop: -250,
        // marginLeft: 105,
        backgroundColor: 'white',
        height: 200,
        width: 200,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      // 420475
      nameText: {
        color: 'black',
        fontSize: 28,

        fontStyle: 'normal',
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      bookCountMain: {
        borderColor: '#b0b0b0',
        borderWidth: 1,
        marginTop: 18,
        marginHorizontal: 20,

        borderRadius: 20,
        flexDirection: 'row',
        width: '88%',
      },
      bookCount: {
        width: '50%',
        borderColor: '#b0b0b0',
        borderRightWidth: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      bookCountNum: {
        color: '#5D01AA',
        fontSize: 34,
        fontWeight: '800',
      },
      bookCountText: {color: '#b3b3b3', fontSize: 14, fontWeight: '500'},
      infoMain: {
        marginTop: 10,
      },
      infoCont: {
        width: '100%',
        flexDirection: 'row',
      },
      infoIconCont: {
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,

        alignItems: 'center',
        elevation: -5,
        borderColor: 'black',
        backgroundColor: 'black',
      },

      infoText: {
        width: '80%',
        flexDirection: 'column',
        marginLeft: 25,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: '#e6e6e6',
      },
      infoSmall_Text: {
        fontSize: 13,
        color: '#b3b3b3',
        fontWeight: '500',
      },
      infoLarge_Text: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
      },
      booksUploadedMain: {
        paddingHorizontal: 10,
        paddingBottom: 30,
        marginTop: 20,
      },
      flatlistDiv: {
        borderRadius: 15,
        paddingHorizontal: 10,
      },
      booksUploadedText: {
        fontSize: 26,
        color: 'black',
        fontWeight: '700',
        paddingLeft: 20,
        paddingBottom: 8,
      },
      booksUploadedCard: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 9,
        marginBottom: 9,

        backgroundColor: '#f2f2f2',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        elevation: 3,
      },
      booksUploadedImgDiv: {
        width: '28%',
      },
      booksUploadedImg: {
        width: '100%',
        height: 120,
        borderRadius: 15,
      },
      cardMidDiv: {
        paddingHorizontal: 10,
        width: '55%',
        position: 'relative',
      },
      approvedText: {
        fontSize: 12,
        color: '#0d7313',
        fontWeight: '600',
        marginLeft: 5,
      },
      cardBookNameText: {
        fontSize: 24,
        color: 'black',
        fontWeight: '700',
        marginTop: 2,
      },
      cardBookAuthor: {
        fontSize: 14,
        color: 'black',
        fontWeight: '600',
        marginTop: 1,
      },
      cardRating: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        flexDirection: 'row',
      },
      cardRatingCount: {
        fontSize: 14,
        marginTop: -2,
        paddingLeft: 4,
        color: '#303030',
      },
      cardEditDiv: {
        width: '17%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardEditBtn: {
        height: 44,
        width: 44,
        backgroundColor: '#774BBC',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
      },
      footer: {
        padding: 10,
        justifyContent: 'center',

        flexDirection: 'row',
      },
      loadMoreBtn: {
        padding: 10,
        backgroundColor: '#f5a002',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        paddingHorizontal: 20,
      },
      btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: '600',
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subscriptionBanner: {
    backgroundColor: '#ff5678',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    marginTop: 50,
    position: 'relative',
  },
  subscriptionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  subscriptionDetail: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 10,
  },
  moreInfoButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  moreInfoText: {
    color: '#ff5678',
    fontWeight: 'bold',
  },
  bannerImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 10,
    position: 'relative',
  },
  icon: {
    borderWidth: 1, // Add border width
    borderColor: '#ccc', // Set border color
    padding: 10,
    borderRadius: 50, // Make icon circular
  },
  menuButton: {
    backgroundColor: 'transparent', // Remove background color
    width: '45%',
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  newTag: {
    backgroundColor: '#00f',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 5,
    borderRadius: 10,
    top: 55,
    position: 'absolute',
  },
  historyButton: {
    backgroundColor: '#0057ff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  historyText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Dashboard;
