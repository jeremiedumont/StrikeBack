//
//  NotifView.swift
//  IosStrikeBack
//
//  Created by user164174 on 3/14/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct NotifView: View {
    var notif : (not : Notification, rem : Remark)
    
    init(notif : (Notification, Remark)){
        self.notif = notif
    }
    
    var body: some View {
        HStack{
            VStack{
                Text(self.notif.rem.title)
                .bold()
                .font(.title)
                Text(String(self.notif.not.numberNotifs) + " new notifications")
            }.padding()
            .frame(minWidth: 0.0, maxWidth: .infinity, alignment: .leading)
            .foregroundColor(Color.white)
                .background(Color.orange)
            .cornerRadius(15)
                .shadow(color : Color.gray.opacity(0.4), radius: 5, x: 0, y: 5)
            
            Button(action:{
                if(!NotificationDAO.deleteNotification(id : self.notif.not.notifId)){
                    print("notif deleted")
                }
            }){
                
                    Image(systemName: "delete.left")
                
            }
        }
    }
}
