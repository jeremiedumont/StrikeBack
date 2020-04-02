//
//  Answer.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/2/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

class Answer : ObservableObject, Identifiable, Codable{
    @Published var userId : String
    @Published var remarkId : String
    @Published var content : String
    @Published var ups : Int
    @Published var downs : Int
    @Published var date : Date
    @Published var pertinency : Int
    @Published var answerId : String
    
    init(remarkId : String, userId : String, downs : Int, content : String, ups : Int, date : Date, pertinency : Int, answerId : String){
        self.remarkId = remarkId
        self.userId = userId
        self.downs = downs
        self.content = content
        self.ups = ups
        self.date = date
        self.pertinency = pertinency
        self.answerId = answerId
    }
    
    
    
    
    private enum CodingKeys : String, CodingKey{
        case userId = "userId"
        case downs = "downs"
        case content = "content"
        case ups = "ups"
        case date = "date"
        case remarkId = "remarkId"
        case pertinency = "pertinency"
        case answerId = "_id"
    }
    
    
    required init(from decoder : Decoder) throws{
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.userId  = try container.decode(String.self, forKey: .userId)
        self.remarkId  = try container.decode(String.self, forKey: .remarkId)
        self.downs = try container.decode(Int.self, forKey: .downs)
        self.content = try container.decode(String.self, forKey: .content)
        self.ups = try container.decode(Int.self, forKey: .ups)
        let isodate : String = try container.decode(String.self, forKey: .date)
        self.pertinency = try container.decode(Int.self, forKey: .pertinency)
        self.answerId = try container.decode(String.self, forKey: .answerId)
        
        let dateF = DateFormatter()
        dateF.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        
        self.date = dateF.date(from: isodate.components(separatedBy: ".")[0])!
        
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(userId, forKey: .userId)
        try container.encode(downs, forKey: .downs)
        try container.encode(content, forKey: .content)
        try container.encode(ups, forKey: .ups)
        try container.encode(remarkId, forKey: .remarkId)
        try container.encode(answerId, forKey: .answerId)//Useless but needed
    }
    
}
