class UserData{
    #userID;
    #userList = [];

    constructor(id){
        this.#userID = id;
    }

    setList(object, index, id){
        this.#userList[index] = new object(id);
    }

    addList(object){
        this.#userList.push(object);
    }

    getList(index){
        return this.#userList[index];
    }

    getListIndex(date){
        return this.#userList.findIndex(x => x.getListDate() === date);
    }

    getListLength(){
        return this.#userList.length;
    }

    toJSON(){
        return {
            userID: this.#userID,
            userList: this.#userList.map(x => x.toJSON())
        };
    }

    static fromData(data){
        const user = new UserData(data.userID);
        data.userList.forEach(x => user.addList(ListData.fromData(x)));
        return user;
    }
}

class ListData {
    #listDate;
    #scheduleArray = [];

    constructor(date){
        this.#listDate = date;
    }

// ===== set method =====

    setSchedule(object, index, id){
        this.#scheduleArray[index] = new object(id);
    }

    addSchedule(object){
        this.#scheduleArray.push(object);
    }

    setScheduleTime(time, index){
        this.#scheduleArray[index].setTime(time);
    }

    setScheduleContent(content, index){
        this.#scheduleArray[index].setContent(content);
    }

    setScheduleDate(date, index){
        this.#scheduleArray[index].setDate(date);
    }

    setScheduleColor(color, index){
        this.#scheduleArray[index].setColor(color);
    }
    
    setScheduleNotify(notify, index){
        this.#scheduleArray[index].setNotify(notify);
    }

// ===== get method =====

    getListDate(){
        return this.#listDate;
    }

    getSchedule(){
        return this.#scheduleArray;
    }
    
    getScheduleIndex(id){
        return this.#scheduleArray.findIndex(x => x.getId() === id);
    }

    getScheduleId(index){
        return this.#scheduleArray[index].getId();
    }

    getScheduleTime(index){
        return this.#scheduleArray[index].getTime();
    }

    getScheduleContent(index){
        return this.#scheduleArray[index].getContent();
    }

    getScheduleDate(index){
        return this.#scheduleArray[index].getDate();
    }

    getScheduleColor(index){
        return this.#scheduleArray[index].getColor();
    }

    getScheduleNotify(index){
        return this.#scheduleArray[index].getNotify();
    }

    getListLength(){
        return this.#scheduleArray.length;
    }

    deleteSchedule(index){
        this.#scheduleArray.splice(index, 1);
    }

    consoleLogAll(){
        console.log(this.#listDate, this.#scheduleArray);
    }

    toJSON(){
        return {
            listDate: this.#listDate,
            scheduleArray: this.#scheduleArray.map(x => x.toJSON())
        };
    }

    static fromData(data){
        const list = new ListData(data.listDate);
        data.scheduleArray.forEach(x => list.addSchedule(ScheduleData.fromData(x)));
        return list;
    }
}

class ScheduleData {
    #id;
    #time = '07:00';
    #content = '';
    #date = '2026-01-01';
    #color = '#FAFAFA';
    #notify = true;

    constructor(id){
        this.#id = id;
    }

    setTime(time){
        this.#time = time;
    }

    setContent(content){
        this.#content = content;
    }
    
    setDate(date){
        this.#date = date;
    }

    setColor(color){
        this.#color = color;
    }

    setNotify(notify){
        this.#notify = notify;
    }

    getId(){
        return this.#id;
    }

    getTime(){
        return this.#time;
    }

    getContent(){
        return this.#content;
    }
    
    getDate(){
        return this.#date;
    }

    getColor(){
        return this.#color;
    }

    getNotify(){
        return this.#notify;
    }

    consoleLogAll(){
        console.log(this.#id, this.#time, this.#content, this.#date, this.#color, this.#notify);
    }
    
    toJSON(){
        return {
            id: this.#id,
            time: this.#time,
            content: this.#content,
            date: this.#date,
            color: this.#color,
            notify: this.#notify
        }
    }

    static fromData(data){
        const schedule = new ScheduleData(data.id);

        schedule.setTime(data.time);
        schedule.setContent(data.content);
        schedule.setDate(data.date);
        schedule.setColor(data.color);
        schedule.setNotify(data.notify);

        return schedule;
    }
}

// ===== create data object =====

const raw = JSON.parse(localStorage.getItem('appdata'));

const AppData = (() => raw ? UserData.fromData(raw) : new UserData(1))();

export{AppData, UserData, ListData, ScheduleData};

// =====



