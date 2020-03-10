//
//  RemarkDetailsView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/3/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct RemarkDetailsView: View {
    let testColor = UIColor(red: 0.5, green: 0.4, blue: 0.6, alpha: 1)
    var remark: Remark!
    var mytab : AnswerSet
    let formatter = DateFormatter()
    @ObservedObject private var  newAnswer : Answer
    var user = (UIApplication.shared.delegate as! AppDelegate).currentUser
    
    init(remark : Remark){
        self.remark = remark
        self.mytab = AnswerSet(tab: AnswerDAO.getAnswersByRemarkId(remarkId: remark.postId))
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        if (user != nil){
        newAnswer = Answer(remarkId: self.remark.postId, userId: user!.userId , downs: 0, content: " ", ups: 0, date: Date(), pertinency: 0, answerId: " ")
        }
        else{
            newAnswer = Answer(remarkId: self.remark.postId, userId: " " , downs: 0, content: " ", ups: 0, date: Date(), pertinency: 0, answerId: " ")
            }
        
        }
    
    
    var body: some View {
            //details
        
        VStack{
            VStack{
               
                //Remark details
                VStack{
                //auteur et date
                    HStack{
                        Text("Written by")
                            .font(.system(size: 15))
                        Text(UserDAO.getUserById(userId : remark.userId)!.pseudo)
                            .fontWeight(.light)
                            .foregroundColor(Color(testColor))
                            .font(.system(size: 15))
                        Spacer()
                        Text(self.formatter.string(from :remark.date))
                            .italic()
                            .font(.system(size: 15))
                    }
                    //TEXT et titre
                   HStack{
                        if(remark.image != nil){
                            Image(uiImage: remark.image!).resizable().scaledToFit()
                        }
                        VStack{
                            Text(remark.title)
                                .bold()
                                .font(.title)
                                .foregroundColor(Color(.blue))
                            Text(remark.text)
                        }
                    }
                    
                }.padding(10)
                .border(Color.black, width: 3)
                List (mytab.tabAnswer){ answer in
                    AnswerView(answer: answer)
                    .padding()
                    
                }                // LIST DES REPONSES
                .listStyle(PlainListStyle())
                
                
            }
            //si connecté
            if(user != nil){
                Form{
                    TextField("Enter your answer...", text: self.$newAnswer.content)
                    .padding()
                    .background(Color.themeTextField)
                    .cornerRadius(20.0)
                    .shadow(radius: 10.0, x: 20, y: 10)            // BUTTON SUBMIT
                    
                     Button(action:{
                     
                        if(!(AnswerDAO.addAnswer(ans: self.newAnswer))){
                         print("erreur lors de l'ajout")
                     }
                        //self.isActive = false
                        //self.presentation.wrappedValue.dismiss()
                    }){
                        Text("Submit")
                    }
                }
            }
        }
    }
}

// Text("Last Name : \(person.lastName)")
