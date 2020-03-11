//
//  MyProfilView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/11/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct MyProfilView: View {
    let formatter = DateFormatter()
    @State var isActiveColor : Bool = false;
    @State var isActivePassword : Bool = false;
    var nbRemark : String
    var nbAnswer : String
    init(){
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        nbRemark = String(RemarkDAO.getAllUserRemarks(userId: currentUser!.userId).count)
        nbAnswer = String(AnswerDAO.getAllUserAnswers(userId: currentUser!.userId).count)
        
    }
    
    var currentUser : User? = (UIApplication.shared.delegate as! AppDelegate).currentUser
    var body: some View {
        VStack{
            Spacer()
            VStack{
                Text("Votre Profil").bold()
                Text(""+currentUser!.pseudo)
                Button(action : {
                    self.isActiveColor.toggle()
                }){
                    Text("Changer la couleur d'affichage de votre pseudo")
                }.sheet(isPresented : self.$isActiveColor){
                    ChangeColorView(isActiveColor : self.$isActiveColor)
                }
            }
            Spacer()
            VStack{
                Text(self.formatter.string(from : currentUser!.creationDate))
                Text(""+currentUser!.email)
                Button(action : {
                    self.isActivePassword.toggle()
                }){
                    Text("Changer son mot de passe")
                }.sheet(isPresented : self.$isActivePassword){
                    ChangePasswordView(isActivePassword : self.$isActivePassword)
                }
            
            }
            VStack{
                    Text("Vous avez posté " + nbRemark + " remarques")
                    Text("Vous avez répondu à " + nbAnswer  + " remarques")
                
            }
            Spacer()
        }
        
    }
}
