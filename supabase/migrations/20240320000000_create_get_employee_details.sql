
CREATE OR REPLACE FUNCTION get_employee_details(p_employee_id UUID)
RETURNS json
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (
        SELECT 
            json_build_object(
                'id', e.id,
                'employee_id', e.employee_id,
                'first_name', e.first_name,
                'last_name', e.last_name,
                'email', e.email,
                'phone', e.phone,
                'date_of_birth', e.date_of_birth,
                'gender', e.gender,
                'blood_group', e.blood_group,
                'marital_status', e.marital_status,
                'department', e.department,
                'position', e.position,
                'employment_status', e.employment_status,
                'created_at', e.created_at,
                'updated_at', e.updated_at,
                'present_address', (
                    SELECT json_build_object(
                        'addressLine1', a.address_line1,
                        'country', a.country,
                        'state', a.state,
                        'city', a.city,
                        'zipCode', a.zip_code
                    )
                    FROM employee_addresses a 
                    WHERE a.employee_id = e.id 
                    AND a.type = 'present'
                    ORDER BY a.created_at DESC 
                    LIMIT 1
                ),
                'permanent_address', (
                    SELECT json_build_object(
                        'addressLine1', a.address_line1,
                        'country', a.country,
                        'state', a.state,
                        'city', a.city,
                        'zipCode', a.zip_code
                    )
                    FROM employee_addresses a 
                    WHERE a.employee_id = e.id 
                    AND a.type = 'permanent'
                    ORDER BY a.created_at DESC 
                    LIMIT 1
                ),
                'emergency_contacts', (
                    SELECT json_agg(
                        json_build_object(
                            'name', ec.name,
                            'relationship', ec.relationship,
                            'phone', ec.phone
                        )
                    )
                    FROM employee_emergency_contacts ec
                    WHERE ec.employee_id = e.id
                ),
                'family_details', (
                    SELECT json_agg(
                        json_build_object(
                            'name', f.name,
                            'relationship', f.relationship,
                            'occupation', f.occupation,
                            'phone', f.phone
                        )
                    )
                    FROM employee_family_details f
                    WHERE f.employee_id = e.id
                )
            )
        FROM employees e
        WHERE e.id = p_employee_id
    );
END;
$$;
