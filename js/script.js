const {createApp} = Vue;

createApp({
    data(){
        return {
            contacts: [
                {
                    id:1,
                    name: 'Michele',
                    avatar: './img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id:2,
                    name: 'Fabio',
                    avatar: './img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    id:3,
                    name: 'Samuele',
                    avatar: './img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id:4,
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    id:5,
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    id:6,
                    name: 'Claudia',
                    avatar: './img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    id:7,
                    name: 'Federico',
                    avatar: './img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id:8,
                    name: 'Davide',
                    avatar: './img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            chatActive: false,
            indexChat: 0,
            newMessageText: '',
            search: "",
            filteredArray: ""
        }
    },
    methods: {
        openChat(index){
            this.indexChat = index;
        },
        sendMessage(){
            if (this.newMessageText != ''){
                let data = this.getHoursAndMinutes();
                const newMessage = {
                    date: data,
                    message: this.newMessageText,
                    status: 'sent'
                }
                this.contacts[this.indexChat].messages.push(newMessage);
                this.newMessageText = '';
                const timeout = setTimeout(this.computerAnswer, 4000);
            }
        },
        filteredContacts(){
            if (this.search === ''){
                // if the input is void filteredArray contain all the contacts array
                this.filteredArray = this.contacts;
            }else{
                //else filteredArray contains a filter of the contacts array
                this.filteredArray = this.contacts.filter(contact =>{
                    // if the input is includes in the list of contacts names or in the list of messages it returns true
                    if(contact.name.toLowerCase().includes(this.search.toLowerCase()) || contact.messages.some(text => text.message.toLowerCase().includes(this.search.toLowerCase()))){
                        return true;
                    }
                })
            }
        },
        computerAnswer(){
            let data = this.getHoursAndMinutes();
            const newMessage = {
                date: data,
                message: 'Ok!',
                status: 'received'
            }
            this.contacts[this.indexChat].messages.push(newMessage);
        },
        getHoursAndMinutes(){
            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();
            let localdata = "";
            if(hours < 10){
                hours = "0" + hours;
            }
            if(minutes < 10){
                minutes = "0" + minutes;
            }
            localdata = hours + ":" + minutes
            return localdata;
        }
        
    },
}).mount('#app');