module.exports = {
    nlpModule: function(manager){
        main(manager)
    }
}

function main(manager){
    start(manager)
    end(manager)
    askHowAreYou(manager)
    queryDev(manager)

    async function nlpTrainSave(){
        await manager.train();
        manager.save();
    }
    nlpTrainSave()
}

function start(manager){
    manager.addDocument('en', 'hello', 'start');
    manager.addDocument('en', 'hello there', 'start');
    manager.addDocument('en', 'hi', 'start');
    manager.addDocument('en', 'hi there', 'start');

    manager.addAnswer('en', 'start', 'Hey there!');
    manager.addAnswer('en', 'start', 'Hello there!');
    manager.addAnswer('en', 'start', 'Hi');
    manager.addAnswer('en', 'start', 'Hello');
}

function end(manager){
    manager.addDocument('en', 'Goodbye', 'end');
    manager.addDocument('en', 'Bye bye', 'end');
    manager.addDocument('en', 'See you later', 'end');
    manager.addDocument('en', 'I need to go', 'end');
    manager.addDocument('en', 'I should go', 'end');

    manager.addAnswer('en', 'end', 'Till next time');
    manager.addAnswer('en', 'end', 'See you soon!');
    manager.addAnswer('en', 'end', 'Bye');
    manager.addAnswer('en', 'end', 'Take care');
    manager.addAnswer('en', 'end', 'Have a gread day/night!');
}

function askHowAreYou(manager){
    manager.addDocument('en', 'sup', 'howAreYou')
    manager.addDocument('en', 'how are you', 'howAreYou')
    manager.addDocument('en', 'whatsup', 'howAreYou')
    manager.addDocument('en', 'are you ok', 'howAreYou')

    manager.addAnswer('en', 'howAreYou' ,'I am fine.')
    manager.addAnswer('en', 'howAreYou' ,'I am ok.')
    manager.addAnswer('en', 'howAreYou' ,'Good')
}

function queryDev(manager){
    manager.addDocument('en', 'Who developed you', 'queryDev');
    manager.addDocument('en', 'Who coded you', 'queryDev');
    manager.addDocument('en', 'Who made you', 'queryDev');

    manager.addAnswer('en', 'queryDev' ,'I was developed by Raunak Raj Adhikari')
}