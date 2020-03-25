//
//  NotificationsView.swift
//  IosStrikeBack
//
//  Created by user164174 on 3/14/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct NotificationsView: View {
    @ObservedObject var mytab : NotifSet
    @State var count : Int = NotificationDAO.getAllUserNotifications().count
    @State var isActive = false
    @State var currentRemark : Remark = Remark(postId: "", userId: "", title: "", text: "", image: UIImage(), date: Date(), heard: 0)
    @State var currentNotif : Notification = Notification(postId: "", userId: "", numberNotifs: 0, notifId: "")
    
    init(){
        let notifs = NotificationDAO.getAllUserNotifications()
        print(notifs.count)
        var temptabnot : [Notification] = []
        var temptabrem : [Remark] = []
        
        notifs.forEach{notif in
            print(notif.postId + ": " + String(notif.numberNotifs))
            if let rem = RemarkDAO.getRemark(remarkId: notif.postId){
                temptabnot.append(notif)
                temptabrem.append(rem)
            }
        }
        
        mytab = NotifSet(tabNotif: temptabnot, tabRemark: temptabrem)
        //count = notifs.count
    }
    
    var body: some View {
        VStack{
            ScrollView{
                
                ForEach (0 ..< self.count){ index in
                    VStack{
                        HStack{
                            Button(action: {
                                self.isActive.toggle()
                                
                                if(!NotificationDAO.deleteNotification(id : self.mytab.tabNotif[index].notifId)){
                                    print("notif deleted")
                                }
                                else{
                                    self.currentRemark = self.mytab.tabRemark[index]
                                    self.currentNotif = self.mytab.tabNotif[index]
                                    self.mytab.tabNotif.remove(at: index)
                                    self.mytab.tabRemark.remove(at: index)
                                    self.count -= 1
                                }
                                
                            }){
                                if(index < self.mytab.tabNotif.count){
                                    NotifView(notif: (self.mytab.tabNotif[index],self.mytab.tabRemark[index]))
                                    
                                }
                            }.sheet(isPresented: self.$isActive){
                                RemarkDetailsView(remark: self.currentRemark)
                                
                            }
                            Button(action:{
                                if(!NotificationDAO.deleteNotification(id : self.mytab.tabNotif[index].notifId)){
                                    print("notif deleted")
                                }
                                else{
                                    self.currentRemark = self.mytab.tabRemark[index]
                                    self.currentNotif = self.mytab.tabNotif[index]
                                    self.mytab.tabNotif.remove(at: index)
                                    self.mytab.tabRemark.remove(at: index)
                                    self.count -= 1
                                }
                            }){
                                if(index < self.mytab.tabNotif.count){

                                    Image(systemName: "delete.left")
                                }
                                
                            }
                        }
                        /*NavigationLink(destination : RemarkDetailsView(remark: self.mytab[index].rem)){
                               
                            NotifView(notif: self.mytab[index])
                            
                        }.simultaneousGesture(TapGesture().onEnded{
                            if(!NotificationDAO.deleteNotification(id : self.mytab[index].not.notifId)){
                                print("notif deleted")
                            }
                        })*/
                        if(index < self.mytab.tabNotif.count){
                            Divider().frame(height: 20).padding()
                        }
                    }
                }
                
            }
        }
    }
}
