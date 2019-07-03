import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { TasksService } from 'src/app/services/tasks.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

    eventSource = [];
    viewTitle;
    event = {
        title: '',
        desc: '',
        startTime: '',
        endTime: '',
        allDay: false
    };
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

    /**
     * constructor loads tasks
     * @param alertCtrl
     * @param locale
     * @param tasksService
     */
    constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID)
                private locale: string, private tasksService: TasksService) { }

    ngOnInit(): void {
        this.tasksService.getAllTasks().subscribe((data) => {
            const events = [];
            for(const task of data) {
                const event = {
                    title: task.title,
                    desc: task.description,
                    startTime: new Date(task.dueDate),
                    endTime: new Date(task.dueDate),
                    allDay: false
                };
                events.push(event);
            }
            console.log(events);
            this.eventSource = events;
        }, err => {
            console.log(err);
        });
    }

    /**
     * Change month/week/day next
     */
    next() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    }

    /**
     * Change month/week/day back
     */
    back() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    }

    /**
     * Change between month/week/day
     * @param mode
     */
    changeMode(mode) {
        this.calendar.mode = mode;
    }

    /**
     * Calendar event was clicked
     */
    today() {
        this.calendar.currentDate = new Date();
    }

    /**
     * Calendar event was clicked
     * @param event
     */
    async onEventSelected(event) {
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

    /**
     * Time slot was clicked
     * @param ev
     */
    onTimeSelected(ev) {
        const selected = new Date(ev.selectedTime);
        this.event.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.event.endTime = (selected.toISOString());
    }

    /**
     * Selected date hence title changed
     * @param title
     */
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
}
