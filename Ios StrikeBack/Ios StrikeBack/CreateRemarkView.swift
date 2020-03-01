//
//  CreateRemarkView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 2/28/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct CreateRemarkView: View {
    @ObservedObject private var remark : Remark = Remark(postId : "", userId : "useridqdhfjekfs", title : "", text : "", image : "", date : Date(), heard : 0)
     @Binding var isActive : Bool
     var body: some View {
           NavigationView{
               Form{
                   Section(header: Text("title")){
                       TextField("title", text: $remark.title)
                   }
                   Section(header: Text("text")){
                    TextField("text", text: $remark.text)
                   }
                   Section(header: Text("image")){
                       TextField("image", text: $remark.image)
                   }
                   Section{
                       Button(action:{
                        if(!(RemarkDAO.addRemark(rem: self.remark))){
                            print("erreur lors de l'ajout")
                        }
                           self.isActive = false
                           //self.presentation.wrappedValue.dismiss()
                       }){
                           Text("Submit")
                       }
                   }
               }
               
           }
       }
}

/*
struct CreateView : View{
    @ObservedObject private var person : Person = Person(firstName: "", lastName: "", job: "", department: "")
//    @State var firstname : String;
    @Binding var isActive : Bool

}
*/
