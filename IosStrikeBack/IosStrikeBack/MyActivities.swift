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
    var myanswers : [(Answer, Remark)] = []
    var mytabs = ["My Remarks", "My answers"]
    @State private var selectedTab = 0
    init(){
        if let user = user{
            myremarks = RemarkSet(tab : RemarkDAO.getAllUserRemarks())
            var answerslist = AnswerSet(tab: AnswerDAO.getAllUserAnswers())
            answerslist.tabAnswer.forEach{ans in
                if let rem = RemarkDAO.getRemark(remarkId: ans.remarkId){
                    myanswers.append((ans, rem))
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
                ScrollView{
                    VStack{
                        ForEach(0 ..< myremarks.tabRemark.count){ index in
                            //NavigationLink(destination : DetailView(person: person)){
                            NavigationLink(destination : RemarkDetailsView(remark: self.myremarks.tabRemark[index])){
                                
                                RemarkView(remark : self.myremarks.tabRemark[index], canheard: false)
                                
                            }
                            Divider().frame(height: 20).padding()
                        }
                    }
                }
            }
                //In Answers tab
            else{
                ScrollView{
                    ForEach(0 ..< myanswers.count){ index in
                        
                        VStack{
                            NavigationLink(destination : RemarkDetailsView(remark: self.myanswers[index].1)){
                                
                                RemarkView(remark : self.myanswers[index].1, canheard: false)
                                
                            }
                            NavigationLink(destination : RemarkDetailsView(remark: self.myanswers[index].1)){
                                
                                
                                AnswerView(answer: self.myanswers[index].0, caninteract : false)
                                
                            }
                            Divider().frame(height: 20).padding()
                        }
                        
                    }
                }
                Spacer()
            }
        }
    }
}
