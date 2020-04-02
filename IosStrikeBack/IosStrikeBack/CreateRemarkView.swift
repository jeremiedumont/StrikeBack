//
//  CreateRemarkView.swift
//  Ios StrikeBack
//
//  Created by user164174 on 2/28/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct CreateRemarkView: View {
    var currentUser : User? = (UIApplication.shared.delegate as! AppDelegate).currentUser
    @ObservedObject private var remark : Remark = Remark(postId : "", userId : "", title : "", text : "", image : UIImage(), date : Date(), heard : 0)
    @Binding var isActive : Bool
    @ObservedObject var mytab : RemarkSet
    @State private var showImagePicker : Bool = false
    @State private var image : UIImage? = nil
    var imageData : Data?
    var user = (UIApplication.shared.delegate as! AppDelegate).currentUser
    
    mutating func convertImage(){
        if let image = image {
            self.imageData = image.jpegData(compressionQuality: 0.1)
        }
        if( user != nil){
            remark.userId = user!.userId
        }
        
    }
    
    var body: some View {
        NavigationView{
            VStack{
                
                Button("Open Camera"){
                    self.showImagePicker.toggle()
                }.padding()
                    .foregroundColor(Color.white)
                    .background( Color.purple)
                if(image != nil){
                    Image(uiImage: image!).resizable().scaledToFit()
                    
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
                            if let myimage = self.image{
                                self.remark.image = myimage
                                
                            }
                            if(!(RemarkDAO.addRemark(rem: self.remark))){
                                print("erreur lors de l'ajout")
                            }
                            self.remark.userId = self.currentUser!.userId
                            self.isActive = false
                            self.mytab.tabRemark.append(self.remark)
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

