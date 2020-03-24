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
    @State var isActiveColor : Bool = false
    @State var isActivePassword : Bool = false
    @State var selection: Int? = nil
    @State var isDismissPassword : Bool = false
    var nbRemark : String
    var nbAnswer : String
    init(){
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        nbRemark = String(RemarkDAO.getAllUserRemarks().count)
        nbAnswer = String(AnswerDAO.getAllUserAnswers().count)
        
    }
    
    var currentUser : User? = (UIApplication.shared.delegate as! AppDelegate).currentUser
    var body: some View {
        NavigationView{
        VStack{
            VStack{
                
                
                VStack{
                    HStack{
                    if(currentUser!.color != "none"){
                    Text(""+currentUser!.pseudo).foregroundColor(Color(UIColor(named: currentUser!.color)!))
                        .font(.largeTitle)
                    }
                    else{
                        Text(""+currentUser!.pseudo).font(.largeTitle)
                        
                    }
                        Button(action : {
                            self.isActiveColor.toggle()
                        }){
                           Image(systemName: "square.and.pencil")
                            .foregroundColor(.gray)
                            .imageScale(.large)
                        }.sheet(isPresented : self.$isActiveColor){
                          ChangeColorView(isActiveColor : self.$isActiveColor)
                        }
                    }
                    Text("Email : "+currentUser!.email)
                    Button(action : {
                        self.isActivePassword.toggle()
                    }){
                        Text("Changer son mot de passe")
                    }.sheet(isPresented : self.$isActivePassword){
                        ChangePasswordView(isActivePassword : self.$isActivePassword)
                    }
                }
            }
            Spacer()
            VStack{
                    Text("Vous avez posté " + nbRemark + " remarques")
                    Text("Vous avez répondu à " + nbAnswer  + " remarques")
                Spacer()
                Text("Date d'inscription : " + self.formatter.string(from : currentUser!.creationDate))
                
            }
            Spacer()
        }
            
        }.navigationBarTitle("Mon Profil")

    }
}
