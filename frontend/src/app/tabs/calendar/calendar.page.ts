import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

    event = {
        title: '',
        desc: '',
        startTime: '',
        endTime: '',
        allDay: false
    };

    eventSource = [];
    viewTitle;

    calendar = {
        mode: 'month',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDayHeader: function(date:Date) {
                const days = ['S', 'M', 'D', 'M', 'D', 'F', 'S'];
                return days[date.getDay()];
            }
        }
    };

    @ViewChild(CalendarComponent)
    myCal: CalendarComponent;

    constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) {

        this.eventSource = this.createRandomEvents();
    }

    ngOnInit() {



        const date = new Date();

        const event = {
            title: 'Name',
            desc: 'Besch',
            startTime: new Date(this.event.startTime),
            endTime: new Date(this.event.startTime),
            allDay: false
        };

        this.eventSource.push(event);
        this.myCal.loadEvents();
        this.resetEvent();
    }

    resetEvent() {
        this.event = {
            title: '',
            desc: '',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            allDay: false
        };
    }

    // Change current month/week/day
    next() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    }

    back() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    }

    // Change between month/week/day
    changeMode(mode) {
        this.calendar.mode = mode;
    }

    // Focus today
    today() {
        this.calendar.currentDate = new Date();
    }

    // Calendar event was clicked
    async onEventSelected(event) {

      console.log("onEventSelected");

        // Use Angular date pipe for conversion
        const start = formatDate(event.startTime, 'medium', this.locale);
        const end = formatDate(event.endTime, 'medium', this.locale);

        const alert = await this.alertCtrl.create({
            header: event.title,
            subHeader: event.desc,
            message: 'From: ' + start + '<br><br>To: ' + end,
            buttons: ['OK']
        });
        alert.present();
    }

    // Time slot was clicked
    onTimeSelected(ev) {
        const selected = new Date(ev.selectedTime);
        this.event.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.event.endTime = (selected.toISOString());

        console.log("Time Clicked");
    }

    // Selected date reange and hence title changed
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }


    loadEvents() {
        this.eventSource = this.createRandomEvents();
    }

    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(6 * 90) - 45;
            var endDay = Math.floor(6 * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }
}
