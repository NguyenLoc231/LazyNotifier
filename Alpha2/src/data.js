export class ListData {
    #listDate;
    #scheduleArray = [];
    
    setListDate(date){
        this.#listDate = date;
    }

    getListDate(){
        return this.#listDate;
    }

    setSchedule(object, index){
        this.#scheduleArray[index] = new object(index);
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

    getScheduleId(index){
        this.#scheduleArray[index].getId();
    }

    getScheduleIndex(index){
        console.log(this.#scheduleArray[index]);
    }

    getListLength(){
        console.log(this.#scheduleArray.length);
        return this.#scheduleArray.length;
    }

    deleteSchedule(index){
        this.#scheduleArray.splice(index, 1);
        this.#scheduleArray.forEach(id => {
            if (id.getId() > index){
                id.dropId();
            }
        })
    }
}

export class ScheduleData {
    #id;
    #time;
    #content;
    #date;
    #color;
    #notify;

    constructor(id, time, content, date, color, notify){
        this.#id = id;
        this.#time = time;
        this.#content = content;
        this.#date = date;
        this.#color = color;
        this.#notify = notify;
    }

    dropId(id){
        this.#id --;
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
    
}

const listArray = [];



