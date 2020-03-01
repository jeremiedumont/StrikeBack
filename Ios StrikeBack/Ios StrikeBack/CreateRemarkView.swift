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
     @State private var showImagePicker : Bool = false
     @State private var image : UIImage? = nil
    
     var body: some View {
           NavigationView{
            VStack{
                
                Button("Open Camera"){
                    self.showImagePicker.toggle()
                }.padding()
                    .foregroundColor(Color.white)
                    .background( Color.purple)
                if(image != nil){
                    Text("image selected")
                    
                }
               Form{
                Section(header: Text("title")){
                       TextField("title", text: $remark.title)
                   }
                   Section(header: Text("text")){
                    TextField("text", text: $remark.text)
                   }
                   
                   Section{
                       Button(action:{
                        if(self.image != nil){
                            	
                            //var rep = UIImagePNGRepresentation(image)
                            //print(String(data : (self.image?.jpegData(compressionQuality: 0.8))!, encoding : .utf8))
                            //self.remark.image = String(data : (self.image?.pngData())!, encoding : .utf8)!
                        }
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
            }.sheet(isPresented: self.$showImagePicker){
                    PhotoCaptureView(showImagePicker: self.$showImagePicker, image: self.$image)
            
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
