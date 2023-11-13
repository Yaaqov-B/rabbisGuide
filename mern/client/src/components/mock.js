const siteA = {
    nodes: [
        { data: { id: "siteB" } },
        {
            data: {
                id: "sp5",
                label: "A",
                parent: "siteB",
                callCount: 10,
                delayMS: 100,
                url: "http://www.naver.com"
            },
            classes: "switch purple"
        },
        {
            data: {
                id: "lf14",
                label: "B",
                parent: "siteB",
                callCount: 10,
                delayMS: 100
            },
            classes: "switch red"
        },
        {
            data: {
                id: "mf14",
                label: "C",
                parent: "siteB",
                callCount: 10,
                delayMS: 100
            },
            classes: "switch blue"
        },
        {
            data: {
                id: "nf14",
                label: "D",
                parent: "siteB",
                callCount: 10,
                delayMS: 100
            },
            classes: "switch emerald" //styles.js에서 색상을 만들어줘야함
        }
    ],
    edges: [
        // id를 통해 source에서 target으로 노드를 연결해줌
        {
            data: {
                source: "sp5",
                target: "lf14",
                callCount: 10,
                delayMS: 100,
                speed: 100,
                bw: 50
            }
        },
        {
            data: {
                source: "lf14",
                target: "mf14",
                callCount: 15,
                delayMS: 150,
                speed: 100,
                bw: 100
            }
        },
        {
            data: {
                source: "mf14",
                target: "nf14",
                callCount: 20,
                delayMS: 200,
                speed: 100,
                bw: 10
            }
        }
    ]
};

export const elements = {
    // 보여주고자하는 parent를 export
    nodes: [...siteA.nodes],
    edges: [...siteA.edges]
};
