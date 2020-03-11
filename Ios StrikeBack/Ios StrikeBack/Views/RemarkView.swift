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
    
    init(remark : Remark, canheard : Bool){
        self.remark = remark
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        self.canheard = canheard
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
                        .foregroundColor(Color(UIColor(red: 0.5, green: 0.4, blue: 0.6, alpha: 1)))
                        .font(.system(size: 15))
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
                /*HStack{
                    if(remark.image != nil){
                        Image(uiImage: remark.image!).renderingMode(.original).resizable().scaledToFit()
                    }
                    VStack{
                        */
                        Text(remark.text)
                    //}
                //	}
               
                
            }.padding()
            .frame(minWidth: 0.0, maxWidth: .infinity, alignment: .leading)
            .foregroundColor(Color.white)
                .background(Color(red: 0, green : 220/255, blue : 220/255))
            .cornerRadius(15)
                .shadow(color : Color.gray.opacity(0.4), radius: 5, x: 0, y: 5)
        
       
        /*    .padding(8)
                .border(Color.black, width: 2)
                .background(Color.init(red: 245/255, green: 245/255, blue: 245/255))
            .cornerRadius(20)*/
            //if(canheard && currentUser != nil){
                HStack{
                    VStack{
                        if(canheard && currentUser != nil){
                            Button(action : {
                                RemarkDAO.addHeard(remarkId: self.remark.postId)
                            }){
                                Image(systemName: "chevron.up")
                            }
                        }
                            Text(String(self.remark.heard))
                        
                    }
                    if(canheard && currentUser != nil){
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
            //}
            
            
       }
        
        
        
            /*VStack{
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
        .cornerRadius(20)*/
    }
}
