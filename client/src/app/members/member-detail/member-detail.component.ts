import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/members';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { PresenceService } from '../../_services/presence.service';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
  imports: [CommonModule, TabsModule, GalleryModule, DateAgoPipe, MemberMessagesComponent]
})
export class MemberDetailComponent implements OnInit, OnDestroy {
    @ViewChild('memberTabs', {static: true}) memberTabs?:TabsetComponent;
    member: Member = {} as Member;
    images: GalleryItem[] = [];
    activeTab?: TabDirective;
    messages: Message[] = [];
    user?: User;

    constructor(
      private accountService: AccountService, 
      private route: ActivatedRoute, 
      private messageService: MessageService,
      public presenceService: PresenceService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => {
          if(user)
            this.user = user;
        }
      });
    }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
    
    ngOnInit(): void {
      //this.loadMember();
      this.route.data.subscribe({
        next: data => this.member = data['member']
      });

      this.route.queryParams.subscribe({
        next: params => {
          params['tab'] && this.selectTab(params['tab'])
        }
      });

      this.getImages(); 
    }

    onTabActivated(data: TabDirective){
      this.activeTab = data;
      if(this.activeTab.heading === 'Messages' && this.user){
        //this.loadMessages();
        this.messageService.createHubConnection(this.user, this.member.userName);
      }else{
        this.messageService.stopHubConnection();
      }
    }

    loadMessages(){
      if(this.member){
        this.messageService.getMessageThread(this.member.userName).subscribe({
          next: messages => {
            this.messages = messages;
          }
        });
      }
    }

    selectTab(heading: string){
      if(this.memberTabs){
        let tab = this.memberTabs.tabs.find(x => x.heading === heading);
        if(tab) tab.active = true;
      }
    }

    // loadMember(){
    //   const username = this.route.snapshot.paramMap.get('username');

    //   if(!username) return;

    //   this.membersService.getMember(username).subscribe({
    //     next: member => {
    //       this.member = member;
    //       this.getImages(); 
    //     }
    //   });
    // }

    getImages(){
      if(!this.member) return;

      for(const photo of this.member.photos){
        this.images.push(new ImageItem({
          src: photo.url,
          thumb: photo.url
        }));
      }
    }
}
