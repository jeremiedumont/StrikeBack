//
//  NotifSet.swift
//  IosStrikeBack
//
//  Created by user164174 on 3/25/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

class NotifSet : ObservableObject{
    @Published var tabNotif : [Notification]
    @Published var tabRemark : [Remark]
    
    init(tabNotif : [Notification], tabRemark : [Remark]){
        self.tabNotif = tabNotif
        self.tabRemark = tabRemark
        
    }
}
