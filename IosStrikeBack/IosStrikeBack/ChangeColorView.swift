//
//  ChangeColorView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/11/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct ChangeColorView: View {
    @Binding var isActiveColor : Bool
    var currentUser : User? = (UIApplication.shared.delegate as! AppDelegate).currentUser

    var body: some View {
        VStack{
            HStack{
                Text("Pickup the Color you want")
            }
            HStack{
               VStack{
                    Button(action : {
                        UserDAO.updateColor(userId: self.currentUser!.userId, color: "RedColor")
                    }){
                        Text(currentUser!.pseudo)
                    }
                    }.foregroundColor(Color(UIColor(named: "RedColor")!))
                        
                VStack{
                Button(action : {
                    UserDAO.updateColor(userId: self.currentUser!.userId, color: "BlueColor")
                }){
                    Text(currentUser!.pseudo)
                }
                }.foregroundColor(Color(UIColor(named: "BlueColor")!))
                VStack{
                Button(action : {
                    UserDAO.updateColor(userId: self.currentUser!.userId, color: "GreenColor")
                }){
                    Text(currentUser!.pseudo)
                }
                }.foregroundColor(Color(UIColor(named: "GreenColor")!))
                VStack{
                Button(action : {
                    UserDAO.updateColor(userId: self.currentUser!.userId, color: "PinkColor")
                }){
                    Text(currentUser!.pseudo)
                }
                }.foregroundColor(Color(UIColor(named: "PinkColor")!))

            }
    
        }
    }
}


