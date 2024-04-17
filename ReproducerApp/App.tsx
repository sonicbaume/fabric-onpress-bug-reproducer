import React, {useRef, useState} from 'react';
import {View, Text, Button, Animated} from 'react-native';

const componentList: number[] = Array.from(new Array(100).keys());

const App = () => {
    const currScroll = useRef(new Animated.Value(0)).current;
    const [count, setCount] = useState(0);

    return (
    <View style={{flex: 1}}>
        <Animated.View
            style={{
                position: 'absolute',
                zIndex: 2,
                width: '100%',
                transform: [{translateY: currScroll}],
            }}
        >
            <Button
                title={`Press count : ${count}`}
                onPress={() => {
                    console.log('pressed');
                    setCount(count + 1);
                }}
            />
        </Animated.View>
        <Animated.FlatList
            style={{width: '100%', height: '100%', position: 'absolute', zIndex: 1}}
            data={componentList}
            renderItem={({index}) => (
                <Text
                    style={{
                        backgroundColor: 'white',
                        height: 28,
                    }}
                >{index}</Text>
            )}
            keyExtractor={item => item.toString()}
            onScroll={Animated.event(
                [{
                    nativeEvent: {
                        contentOffset: {
                            y: currScroll,
                        },
                    },
                }],
                {useNativeDriver: true},
            )}
        ></Animated.FlatList>
    </View>

    );
};

export default App;