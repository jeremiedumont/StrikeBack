//
//  AnswerView.swift
//  Ios StrikeBack
//
//  Created by etud on 03/03/2020.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct AnswerView: View{
    
    var answer : Answer
    let formatter = DateFormatter()
    init(answer : Answer){
        self.answer = answer
        formatter.dateStyle = .short
        formatter.timeStyle = .short
    }
    var body: some View {
            VStack{
                Text(answer.content)
                HStack{
                    Text(UserDAO.getUserById(userId : answer.userId)!.pseudo)
                    Spacer()
                    Text(self.formatter.string(from: answer.date))
                        
                }.font(.system(size: 13))
            }
            .padding(8)
            .border(Color.black, width: 2)
            .background(Color.init(red: 245/255, green: 245/255, blue: 245/255))
        .cornerRadius(20)
    }
}
