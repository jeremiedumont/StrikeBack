//
//  AnswerView.swift
//  Ios StrikeBack
//
//  Created by etud on 03/03/2020.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct AnswerView: View{
    
    @ObservedObject var answer : Answer
    let formatter = DateFormatter()
    var currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
    var caninteract : Bool
    var userAnswer : User
    var pseudoColor : UIColor
    
    init(answer : Answer, caninteract : Bool){
        self.answer = answer
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        self.caninteract = caninteract
        self.userAnswer = UserDAO.getUserById(userId : answer.userId)!
        if(userAnswer.color == "none"){
            pseudoColor = UIColor(red: 0.5, green: 0.4, blue: 0.6, alpha: 1)
        }else{
            pseudoColor = UIColor(named: userAnswer.color)!
        }
    }
    var body: some View {
        HStack{
            VStack{
                Text(answer.content)
                HStack{
                    Text(userAnswer.pseudo)
                        .foregroundColor(Color(pseudoColor))
                        .bold()
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
                    Spacer()
                    Button(action:{
                        if(AnswerDAO.addUp(answerId: self.answer.answerId)){
                            self.answer.ups += 1
                            self.currentUser?.ups?.append(self.answer.answerId)
                        }
                    }){
                        Image(systemName: "plus.circle")
                    }.disabled(((currentUser?.ups?.contains(self.answer.answerId))!))
                    Spacer()
                    Button(action:{
                        if(AnswerDAO.addDown(answerId: self.answer.answerId)){
                            self.answer.downs += 1
                            self.currentUser?.downs?.append(self.answer.answerId)
                        }
                    }){
                            Image(systemName: "minus.circle")
                    }.disabled(((currentUser?.downs?.contains(self.answer.answerId))!))
                    Spacer()
            }
            Spacer()
            VStack{
                    Button(action : {
                        self.answer.downs += 1//Just to set the state of the view in order to re-render
                        self.answer.downs -= 1//Cancelling what we did the previous line
                        self.currentUser?.reports?.append(self.answer.answerId)
                        /*print(self.answer.answerId)
                        print(self.currentUser?.reports)
                        print(((self.currentUser?.reports?.contains(self.answer.answerId))!))*/
                        if(ReportDAO.addReport(postId: self.answer.answerId, type: "Answer")){
                        }else{
                           //print("OUI C BIEN")
                        }
                    }){
                    Image(systemName: "exclamationmark.triangle")
                    }.disabled(((self.currentUser?.reports?.contains(self.answer.answerId))!))
                .foregroundColor(Color(UIColor(named: "RedColor")!))
            }
        }
    }
    }
}
