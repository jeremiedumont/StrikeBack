//
//  AddAnswer.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/10/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI
import TextView

struct CreateAnswerView: View {
    @ObservedObject var newAnswer : Answer
    @Binding var isActive : Bool
    @ObservedObject var mytab : AnswerSet
    var user = (UIApplication.shared.delegate as! AppDelegate).currentUser
    @State var input = ""
    @State var isEditing = false
     var body: some View {
           NavigationView{
            VStack{
                Button(action:{
                    self.newAnswer.content = self.input
                    if(!(AnswerDAO.addAnswer(ans: self.newAnswer))){
                     print("erreur lors de l'ajout")
                 }
                   
                    self.mytab.tabAnswer.append(self.newAnswer)
                     self.isActive = false
                    
                }){
                    Text("Submit")
                }

                Button(action: {
                    self.isEditing.toggle()
                }){
                TextView(
                    text: $input,
                    isEditing: $isEditing,
                    placeholder: "Enter answer",
                    placeholderColor: Color.gray,
                    backgroundColor: UIColor(red: 244/255, green: 252/255, blue: 250/255, alpha: 1)
                    )
                }      
           }
       }
    }
}

