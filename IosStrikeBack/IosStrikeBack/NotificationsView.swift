//
//  NotificationsView.swift
//  IosStrikeBack
//
//  Created by user164174 on 3/14/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct NotificationsView: View {
    var mytab : [(not : Notification, rem : Remark)] = []
    
    init(){
        let notifs = NotificationDAO.getAllUserNotifications()
        print(notifs.count)
        notifs.forEach{notif in
            print(notif.postId + ": " + String(notif.numberNotifs))
            if let rem = RemarkDAO.getRemark(remarkId: notif.postId){
                mytab.append((not : notif, rem : rem))
            }
        }
    }
    
    var body: some View {
        VStack{
            ScrollView{
                ForEach (0 ..< mytab.count){ index in
                    VStack{
                        NavigationLink(destination : RemarkDetailsView(remark: self.mytab[index].rem)){
                               
                            NotifView(notif: self.mytab[index])
                            
                        }.simultaneousGesture(TapGesture().onEnded{
                            if(!NotificationDAO.deleteNotification(id : self.mytab[index].not.notifId)){
                                print("notif deleted")
                            }
                        })
                        Divider().frame(height: 20).padding()
                    }
                }
                
            }
        }
    }
}
