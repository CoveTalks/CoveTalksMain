export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: string
          email: string
          name: string
          member_type: 'Speaker' | 'Organization'
          bio: string | null
          location: string | null
          phone: string | null
          website: string | null
          linkedin_url: string | null
          profile_image_url: string | null
          specialties: string[] | null
          average_rating: number
          total_reviews: number
          subscription_tier: 'Free' | 'Basic' | 'Premium'
          subscription_status: 'active' | 'cancelled' | 'past_due' | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          is_verified: boolean
          is_featured: boolean
          speaking_fee_min: number | null
          speaking_fee_max: number | null
          years_of_experience: number | null
          languages: string[] | null
          availability_status: 'available' | 'busy' | 'unavailable'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          member_type: 'Speaker' | 'Organization'
          bio?: string | null
          location?: string | null
          phone?: string | null
          website?: string | null
          linkedin_url?: string | null
          profile_image_url?: string | null
          specialties?: string[] | null
          average_rating?: number
          total_reviews?: number
          subscription_tier?: 'Free' | 'Basic' | 'Premium'
          subscription_status?: 'active' | 'cancelled' | 'past_due' | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          is_verified?: boolean
          is_featured?: boolean
          speaking_fee_min?: number | null
          speaking_fee_max?: number | null
          years_of_experience?: number | null
          languages?: string[] | null
          availability_status?: 'available' | 'busy' | 'unavailable'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          member_type?: 'Speaker' | 'Organization'
          bio?: string | null
          location?: string | null
          phone?: string | null
          website?: string | null
          linkedin_url?: string | null
          profile_image_url?: string | null
          specialties?: string[] | null
          average_rating?: number
          total_reviews?: number
          subscription_tier?: 'Free' | 'Basic' | 'Premium'
          subscription_status?: 'active' | 'cancelled' | 'past_due' | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          is_verified?: boolean
          is_featured?: boolean
          speaking_fee_min?: number | null
          speaking_fee_max?: number | null
          years_of_experience?: number | null
          languages?: string[] | null
          availability_status?: 'available' | 'busy' | 'unavailable'
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          member_id: string
          organization_name: string
          organization_type: string | null
          industry: string | null
          size: string | null
          description: string | null
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          member_id: string
          organization_name: string
          organization_type?: string | null
          industry?: string | null
          size?: string | null
          description?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          member_id?: string
          organization_name?: string
          organization_type?: string | null
          industry?: string | null
          size?: string | null
          description?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      speaking_opportunities: {
        Row: {
          id: string
          organization_id: string
          posted_by: string
          title: string
          description: string | null
          event_type: string
          event_format: 'In-Person' | 'Virtual' | 'Hybrid'
          event_date: string
          event_location: string | null
          duration_minutes: number | null
          audience_size: number | null
          budget_min: number | null
          budget_max: number | null
          topics: string[] | null
          requirements: string | null
          status: 'Draft' | 'Open' | 'Reviewing' | 'Filled' | 'Cancelled'
          is_featured: boolean
          application_deadline: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          posted_by: string
          title: string
          description?: string | null
          event_type: string
          event_format: 'In-Person' | 'Virtual' | 'Hybrid'
          event_date: string
          event_location?: string | null
          duration_minutes?: number | null
          audience_size?: number | null
          budget_min?: number | null
          budget_max?: number | null
          topics?: string[] | null
          requirements?: string | null
          status?: 'Draft' | 'Open' | 'Reviewing' | 'Filled' | 'Cancelled'
          is_featured?: boolean
          application_deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          posted_by?: string
          title?: string
          description?: string | null
          event_type?: string
          event_format?: 'In-Person' | 'Virtual' | 'Hybrid'
          event_date?: string
          event_location?: string | null
          duration_minutes?: number | null
          audience_size?: number | null
          budget_min?: number | null
          budget_max?: number | null
          topics?: string[] | null
          requirements?: string | null
          status?: 'Draft' | 'Open' | 'Reviewing' | 'Filled' | 'Cancelled'
          is_featured?: boolean
          application_deadline?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          opportunity_id: string
          speaker_id: string
          cover_letter: string | null
          proposed_fee: number | null
          status: 'Pending' | 'Reviewing' | 'Accepted' | 'Rejected' | 'Withdrawn'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          opportunity_id: string
          speaker_id: string
          cover_letter?: string | null
          proposed_fee?: number | null
          status?: 'Pending' | 'Reviewing' | 'Accepted' | 'Rejected' | 'Withdrawn'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          opportunity_id?: string
          speaker_id?: string
          cover_letter?: string | null
          proposed_fee?: number | null
          status?: 'Pending' | 'Reviewing' | 'Accepted' | 'Rejected' | 'Withdrawn'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          reviewer_id: string
          reviewed_member_id: string
          opportunity_id: string | null
          rating: number
          title: string | null
          comment: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reviewer_id: string
          reviewed_member_id: string
          opportunity_id?: string | null
          rating: number
          title?: string | null
          comment?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reviewer_id?: string
          reviewed_member_id?: string
          opportunity_id?: string | null
          rating?: number
          title?: string | null
          comment?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          conversation_id: string
          subject: string | null
          content: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id: string
          conversation_id: string
          subject?: string | null
          content: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string
          conversation_id?: string
          subject?: string | null
          content?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      featured_speakers: {
        Row: {
          id: string
          name: string
          bio: string | null
          location: string | null
          specialties: string[] | null
          profile_image_url: string | null
          average_rating: number
          total_reviews: number
          years_of_experience: number | null
        }
      }
      upcoming_opportunities: {
        Row: {
          id: string
          title: string
          organization_name: string
          event_date: string
          event_location: string | null
          event_format: 'In-Person' | 'Virtual' | 'Hybrid'
          budget_min: number | null
          budget_max: number | null
          application_deadline: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      member_type: 'Speaker' | 'Organization'
      subscription_tier: 'Free' | 'Basic' | 'Premium'
      event_format: 'In-Person' | 'Virtual' | 'Hybrid'
      application_status: 'Pending' | 'Reviewing' | 'Accepted' | 'Rejected' | 'Withdrawn'
      opportunity_status: 'Draft' | 'Open' | 'Reviewing' | 'Filled' | 'Cancelled'
    }
  }
}
