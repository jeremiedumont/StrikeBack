//
//  Post.swift
//  Ios StrikeBack
//
//  Created by user164174 on 2/27/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

protocol Post : ObservableObject, Identifiable, Decodable{
    var userId : String { get }
    @Published var textContent : String
    @Published var date : Date
    @Published var postId : String
   
    init(postId : String, userId : String, textContent : String, date : Date){
        self.userId = userId
        self.postId = postId
        self.textContent = textContent
        self.date = date
    }
    
   
    
    public enum CodingKeys : String, CodingKey{
        case userId = "userId"
        case postId = "postId"
        case textContent = "textContent"
        case date = "date"
    }
    
    
    required init(from decoder : Decoder) throws{
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.userId  = try container.decode(String.self, forKey: .userId)
        self.postId = try container.decode(String.self, forKey: .postId)
        self.textContent = try container.decode(String.self, forKey: .textContent)
        self.date = try container.decode(Date.self, forKey: .date)
    }
    
}
