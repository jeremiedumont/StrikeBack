//
//  AnswerSet.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/2/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

class AnswerSet : ObservableObject{
    @Published var tabAnswer : [Answer]
    init(tab : [Answer]){
        self.tabAnswer = tab
    }
}
