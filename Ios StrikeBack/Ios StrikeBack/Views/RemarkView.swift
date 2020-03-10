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
    let formatter = DateFormatter()
    init(remark : Remark){
        self.remark = remark
        formatter.dateStyle = .short
        formatter.timeStyle = .short
    }
    var body: some View {
        //Remark details
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
            
            
        }.padding(8)
            .border(Color.black, width: 2)
            .background(Color.init(red: 245/255, green: 245/255, blue: 245/255))
        .cornerRadius(20)
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
