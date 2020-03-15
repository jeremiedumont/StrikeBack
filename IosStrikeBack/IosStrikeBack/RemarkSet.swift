//
//  RemarkSet.swift
//  Ios StrikeBack
//
//  Created by user164174 on 2/27/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

class RemarkSet : ObservableObject{
    @Published var tabRemark : [Remark]
    init(tab : [Remark]){
        self.tabRemark = tab
    }
    
    
}
