//
//  MyActivities.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/2/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI

struct MyActivities : View{
    var user = (UIApplication.shared.delegate as! AppDelegate).currentUser
    var myremarks : RemarkSet
    var myanswers : [(String, String)] = []
    var mytabs = ["My Remarks", "My answers"]
    @State private var selectedTab = 0
    /*var tabRemarks = getAllUserRemarks(userId : String)*/
    init(){
        if let user = user{
            myremarks = RemarkSet(tab : RemarkDAO.getAllUserRemarks(userId: user.userId))
            var answerslist = AnswerSet(tab: AnswerDAO.getAllUserAnswers(userId: user.userId))
            answerslist.tabAnswer.forEach{ans in
                if let rem = RemarkDAO.getRemark(remarkId: ans.remarkId){
                    myanswers.append((ans.content, rem.text))
                }
            }
        }else{
            myremarks = RemarkSet(tab: [])
            myanswers = []
        }
    }
    var body: some View {
       VStack {
           // 2
           Picker("Numbers", selection: $selectedTab) {
               ForEach(0 ..< mytabs.count) { index in
                   Text(self.mytabs[index]).tag(index)
               }
           }
           .pickerStyle(SegmentedPickerStyle())
         
        //In Remarks tab
        if(selectedTab==0){
            List (myremarks.tabRemark){ remark in
                //NavigationLink(destination : DetailView(person: person)){
                Text(remark.text)
                //}
            }
        }
        //In Answers tab
        else{
            ForEach(0 ..< myanswers.count){ index in
                //NavigationLink(destination : DetailView(person: person)){
                VStack{
                    Text(self.myanswers[index].1).font(.system(size: 30))
                    Text(self.myanswers[index].0)
                }
                .background(Color.gray)
                .padding(10)
                
                //}
            }
            
        }
       }
    }
}
