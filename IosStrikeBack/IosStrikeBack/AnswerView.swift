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
    var currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
    var caninteract : Bool
    
    init(answer : Answer, caninteract : Bool){
        self.answer = answer
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        self.caninteract = caninteract
    }
    var body: some View {
        HStack{
            VStack{
                Text(answer.content)
                HStack{
                    Text(UserDAO.getUserById(userId : answer.userId)!.pseudo)
                    Spacer()
                    Text(self.formatter.string(from: answer.date))
                        
                }.font(.system(size: 13))
                
            }.padding()
            .frame(minWidth: 0.0, maxWidth: .infinity, alignment: .leading)
            .foregroundColor(Color.white)
                .background(Color.orange)
            .cornerRadius(15)
                .shadow(color : Color.gray.opacity(0.4), radius: 5, x: 0, y: 5)
        VStack{
            Text(String(answer.ups)).foregroundColor(Color.green)
            Text(String(answer.downs)).foregroundColor(Color.red)
        }
        if(currentUser != nil && caninteract){
            VStack{
                
                    Button(action:{
                        if(AnswerDAO.addUp(answerId: self.answer.answerId)){
                            self.answer.ups += 1
                        }
                    }){
                        
                            Image(systemName: "plus.circle")
                        
                    }
                    Button(action:{
                        if(AnswerDAO.addDown(answerId: self.answer.answerId)){
                            self.answer.downs += 1
                        }
                    }){
                        
                            Image(systemName: "minus.circle")
                        
                        
                    }
                
            }
            Spacer()
            VStack{
                
                    Button(action : {
                                   //-----------------A FAIRE-----------------------Creer l'action de report---------------------------------------
                    }){
                    Image(systemName: "alarm")
                    }
                    Text("Report")
                
            }
        }
    }
    }
}
