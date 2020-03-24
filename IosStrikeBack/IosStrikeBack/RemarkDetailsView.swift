//
//  RemarkDetailsView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/3/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI
import TextView

struct RemarkDetailsView: View {
    let testColor = UIColor(red: 0.5, green: 0.4, blue: 0.6, alpha: 1)
    var remark: Remark!
    var mytab : AnswerSet
    let formatter = DateFormatter()
    @ObservedObject private var  newAnswer : Answer
    var user = (UIApplication.shared.delegate as! AppDelegate).currentUser
    @State var isActive = false;
    var i = 0;
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
                          if( user != nil){
                            VStack{
                              Button(action : {
                                  self.isActive.toggle()
                              }){
                                Image(systemName: "plus.bubble.fill")
                                  Text("add answer")
                              }.sheet(isPresented : self.$isActive){
                                CreateAnswerView(newAnswer: self.newAnswer, isActive : self.$isActive)
                              }
                           
                            }.padding()
                       }
        
            
            VStack{
                HStack{
                //Remark details
                RemarkView(remark: remark, canheard: false)
                
                /*VStack{
                      Button(action : {
                          RemarkDAO.addHeard(remarkId: self.remark.postId)
                          }){
                              Image(systemName: "chevron.up")
                          }
                              Text(String(self.remark.heard))
                      }
                          VStack{
                              Button(action : {
                                             //-----------------A FAIRE-----------------------Creer l'action de report---------------------------------------
                              }){
                              Image(systemName: "alarm")
                              }
                              Text("Report")
                          }
                }*/
                
                /*
                List (mytab.tabAnswer){ answer in
                    AnswerView(answer: answer)
                    .padding()
                    
                }                // LIST DES REPONSES
                .listStyle(PlainListStyle())
                */
                }
                ScrollView{
                    VStack(spacing: 20){
                        ForEach(mytab.tabAnswer){ answer in
                            AnswerView(answer: answer, caninteract: true)
                            .padding()
                        }
                    }
                }
                
            }
            
        }
    }
}

// Text("Last Name : \(person.lastName)")
