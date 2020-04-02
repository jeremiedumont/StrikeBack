//
//  RemarkView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/9/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation


import SwiftUI

struct RemarkView: View{
    
    var remark : Remark
    var canheard : Bool
    var currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
    let formatter = DateFormatter()
    var userRemark : User
    var pseudoColor : UIColor
    
    init(remark : Remark, canheard : Bool){
        self.remark = remark
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        self.canheard = canheard
        userRemark = UserDAO.getUserById(userId : remark.userId)!
        if(userRemark.color == "none"){
            pseudoColor = UIColor(red: 0.5, green: 0.4, blue: 0.6, alpha: 1)
        }else{
            pseudoColor = UIColor(named: userRemark.color)!
        }
    }
    
    var body: some View {
        //Remark details
        HStack{
            VStack{
                //auteur et date
                HStack{
                    Text("Written by")
                        .font(.system(size: 15))
                    Text(UserDAO.getUserById(userId : remark.userId)!.pseudo)
                        .fontWeight(.light)
                        .foregroundColor(Color(pseudoColor))
                        .font(.system(size: 15))
                        .bold()
                    Spacer()
                    Text(self.formatter.string(from :remark.date))
                        .italic()
                        .font(.system(size: 15))                    
                }
                Text(remark.title)
                    .bold()
                    .font(.title)
                //TEXT et titre
                if(remark.image != nil){
                    Image(uiImage: remark.image!).renderingMode(.original).resizable().scaledToFit()
                }
                Text(remark.text)
            }.padding()
                .frame(minWidth: 0.0, maxWidth: .infinity, alignment: .leading)
                .foregroundColor(Color.white)
                .background(Color(red: 0, green : 220/255, blue : 220/255))
                .cornerRadius(15)
                .shadow(color : Color.gray.opacity(0.4), radius: 5, x: 0, y: 5)
        }
    }
}
