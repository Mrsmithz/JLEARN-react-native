import React, { useEffect } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView
} from "react-native";
import Navbar from "../Navbar/Navbar"
import { Avatar } from 'react-native-elements';
import { Box } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useSWR from 'swr'
import API from "../../service/API"
import { Fetcher } from "../../service/Fetcher";
import UserService from "../../service/UserService"

function LeaderBoard(props) {
    const assignmentId = props.route.params.id
    const url = API.User.getScoreboard + assignmentId
    const { data, error } = useSWR(url, Fetcher)
    const [scoreList, setScoreList] = React.useState([])
    const [myScore, setMyScore] = React.useState(null)
    const [userEmail, setUserEmail] = React.useState("")
    const [user, setUser] = React.useState("")
    const getUser = async () => {
        let result = await UserService.getUser()
        setUserEmail(result.data.email)
        setUser(result.data)
    }
    const sortScore = (data) => {
        data.sort(function compare(a, b) {
            if (a.totalScore < b.totalScore) {
                return 1;
            }
            if (a.totalScore > b.totalScore) {
                return -1;
            }
            return 0;
        })
        setScoreList(data)
        data.forEach((score, index) => {
            if (score.email === userEmail) {
                score.rank = index + 1
                setMyScore(score)
            }
        })
    }
    useEffect(() => {
        console.log("leader board update")
        if (userEmail === "") {
            getUser()
        }
        if (data) {
            sortScore(data)
        }
    })
    return (
        <View style={styles.container}>
            <Navbar back={true} header={"Leader Board"} props={props}></Navbar>
            {data && scoreList ?
                (<>
                    <View style={styles.box}>
                        <View style={styles.row}>
                            <Avatar
                                rounded
                                size={45}
                                source={{
                                    uri:
                                        user.picture,
                                }}
                            />
                            <Text style={styles.myname}>{`${user.firstName} ${user.lastName}`}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={{ flex: 1 }}></View>
                            <Text style={[styles.text, { flex: 1, textAlign: 'center' }]}>{`Rank : ${myScore ? myScore.rank : '-'}`}</Text>
                            <View style={{ flex: 1 }}></View>
                            <Text style={[styles.myscore]}>{myScore ? `${myScore.totalScore}/${myScore.fullScore}` : '-'}</Text>
                            <View style={{ flex: 1 }}></View>
                        </View>
                    </View>

                    <ScrollView>
                        <View style={styles.cardLayout}>
                            {scoreList.map((score, index) => {
                                return (
                                    <View style={styles.card} key={index}>
                                        <View style={styles.row}>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                {
                                                    index + 1 === 1 ? <Icon name="medal" size={30} color="#FFCA03" /> :
                                                        index + 1 === 2 ? <Icon name="medal" size={30} color="#EADEDE" /> :
                                                            index + 1 === 3 ? <Icon name="medal" size={30} color="#CF0000" /> :
                                                                <Text style={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif", fontSize: 18, color: '#233E8B' }}>{index + 1}</Text>
                                                }
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <Avatar
                                                    rounded
                                                    size={40}
                                                    // title="MD"
                                                    // overlayContainerStyle={{ backgroundColor: 'grey' }}
                                                    source={{
                                                        uri:
                                                            score.picture,
                                                    }}
                                                />
                                            </View>
                                            <View style={{ flex: 4, }}>
                                                <Text style={styles.name} numberOfLines={1}>{`${score.firstName} ${score.lastName}`}</Text>
                                                <Text style={styles.email}>{score.email}</Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <Text style={styles.score}>{`${score.totalScore}/${score.fullScore}`}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                    <View style={styles.scoreboard}>
                        <Text style={styles.text}>Score Board</Text>
                    </View>
                </>)
                : null
            }

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#F3E1E1",
        flex: 1
    },
    box: {
        backgroundColor: "#2978B5",
        borderRadius: 10,
        marginTop: 10,
        width: "90%",
        height: 130,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {
            width: 7,
            height: 7,
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
        shadowColor: "#6D8299",
    },
    cardLayout: {
        marginTop: 1,
    },
    card: {
        backgroundColor: "#F6F6F6",
        width: "98%",
        height: 80,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
        shadowOffset: {
            width: 7,
            height: 7,
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
        shadowColor: "#6D8299",
    },
    myname: {
        fontSize: 18,
        marginLeft: 10,
        color: 'snow',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        marginLeft: 5,
        marginTop: 5,
        color: 'snow',
        fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif",
        flex: 1,
        textAlign: 'center'
    },
    myscore: {
        fontSize: 30,
        marginLeft: 5,
        color: '#FCFFA6',
        fontWeight: "bold",
        fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
    },
    scoreboard: {
        width: "50%",
        position: 'absolute',
        height: 30,
        backgroundColor: '#FFB319',
        marginTop: 225,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    name: {
        fontSize: 14,
        color: '#233E8B',
        fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
    },
    email: {
        fontSize: 14,
        color: '#93B5C6',
        fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
    },
    score: {
        fontSize: 14,
        color: '#14279B',
        fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
    }
});
export default LeaderBoard;
